#!/bin/bash

#######################################
function repo_project_selection() {
  DEPLOY_MODULE_NAMES=(
      "${DEPLOY_MODULE_NAME}")
  for DEPLOY_MODULE_NAME in ${DEPLOY_MODULE_NAMES[@]}; do
     echo "These DEPLOY_MODULE_NAMES are deploying : ${DEPLOY_MODULE_NAME}"
  done
}


#######################################
function blob_cdn_data() {
  export AZURE_STORAGE_CONTAINER="\$web"
  export AZURE_STORAGE_BACKUP_CONTAINER="web-backup"
}


#######################################
function blob_precheck() {
    if az storage blob list -c ${AZURE_STORAGE_CONTAINER} 2>/dev/null ; then
        echo "DEVOPS_NOTICE :: ${AZURE_STORAGE_ACCOUNT}/${AZURE_STORAGE_CONTAINER} present...!"
        if az storage blob list -c ${AZURE_STORAGE_BACKUP_CONTAINER} 2>/dev/null ; then
            echo "DEVOPS_NOTICE :: ${AZURE_STORAGE_ACCOUNT}/${AZURE_STORAGE_BACKUP_CONTAINER} present...!"
        else
            if [[ ! ${BLOB_CREATE} == Tried ]] ; then
                az storage container create -n ${AZURE_STORAGE_BACKUP_CONTAINER}
                sleep 2
                local BLOB_CREATE=Tried
                blob_build_precheck
            else
                echo "Tried to create the blog storage container : ${AZURE_STORAGE_ACCOUNT}/${AZURE_STORAGE_BACKUP_CONTAINER} but failed...!, Please check the azure storage portal"
                exit 1
            fi
        fi
    else
        echo "DEVOPS_NOTICE :: The specified bucket does not exist or you don't have permission : ${AZURE_STORAGE_ACCOUNT}/${AZURE_STORAGE_CONTAINER}"
        exit 1
    fi
}


#######################################
function blob_clone() {
    blob_precheck
    if az storage blob list -c ${AZURE_STORAGE_CONTAINER} 2>/dev/null ; then
        mkdir -p ${WORKSPACE}/${AZURE_STORAGE_ACCOUNT}/${AZURE_STORAGE_CONTAINER} ${WORKSPACE}/${AZURE_STORAGE_ACCOUNT}/${AZURE_STORAGE_BACKUP_CONTAINER}
        az storage blob download-batch -s ${AZURE_STORAGE_CONTAINER} -d ${WORKSPACE}/${AZURE_STORAGE_ACCOUNT}/${AZURE_STORAGE_CONTAINER}/
        az storage blob download-batch -s ${AZURE_STORAGE_BACKUP_CONTAINER} -d ${WORKSPACE}/${AZURE_STORAGE_ACCOUNT}/${AZURE_STORAGE_BACKUP_CONTAINER}/
        if [[ -f ${WORKSPACE}/${AZURE_STORAGE_ACCOUNT}/${AZURE_STORAGE_BACKUP_CONTAINER}/README.md ]] ; then
            echo "BackUp Folder contain README file....!"
        else
            echo "Don't touch this folder" > ${WORKSPACE}/${AZURE_STORAGE_ACCOUNT}/${AZURE_STORAGE_BACKUP_CONTAINER}/README.md
        fi
    else
        echo "DEVOPS_NOTICE :: The specified bucket does not exist or you don't have permission : ${AZURE_STORAGE_ACCOUNT}/${AZURE_STORAGE_CONTAINER}"
        exit 1
    fi
}


#######################################
function version_manage() {
      export P_W_D=${PWD}
      if [[ -f ${WORKSPACE}/${AZURE_STORAGE_ACCOUNT}/${AZURE_STORAGE_BACKUP_CONTAINER}/VERSION ]]; then
        echo "DEVOPS_NOTICE :: version for ${DEPLOY_MODULE_NAME} in ${DEPLOY_ENV} is exist"
      else
        echo "DEVOPS_NOTICE :: creating version files for ${DEPLOY_MODULE_NAME} in ${DEPLOY_ENV} environment"
        echo "# Don't edit the VERSION file manually" > ${WORKSPACE}/${AZURE_STORAGE_ACCOUNT}/${AZURE_STORAGE_BACKUP_CONTAINER}/VERSION
        echo "1.0.0" >> ${WORKSPACE}/${AZURE_STORAGE_ACCOUNT}/${AZURE_STORAGE_BACKUP_CONTAINER}/VERSION
      fi

      cd ${WORKSPACE}/${AZURE_STORAGE_ACCOUNT}/${AZURE_STORAGE_BACKUP_CONTAINER}/
      ${CMD_PREFIX} docker run --rm -v "${PWD}":/app akhilrajmailbox/bump PATCH &> /dev/null

      PATCH_CURRENT_VERSION=$(cat VERSION | tail -1 | cut -d "." -f3)
      PATCH_UPTO_VERSION=$(expr ${PATCH_CURRENT_VERSION} - ${VERSION_PERSIST})
      export CURRENT_VERSION=1.0.${PATCH_CURRENT_VERSION}
      export UPTO_VERSION=1.0.${PATCH_UPTO_VERSION}
      export VERSION=${CURRENT_VERSION}

      echo "DEVOPS_NOTICE :: Current Version is : ${VERSION}"
      echo "DEVOPS_NOTICE :: Older Version : ${UPTO_VERSION} will get deleted"
      cd ${P_W_D}
}


#######################################
function get_version() {
	  if [[ ${1} == "create" ]] ; then
		echo "DEVOPS_NOTICE :: bumping up version for ${DEPLOY_MODULE_NAME} under environment : ${DEPLOY_ENV}"
        version_manage
      else
        echo "DEVOPS_NOTICE :: Using existing Docker image for ${DEPLOY_MODULE_NAME} under environment : ${DEPLOY_ENV}"
      fi

      export P_W_D=${PWD}
      if [[ ! -z "${ROLLING_IMG_NO}" ]] ; then
        echo "The Rolling Image number is : ${ROLLING_IMG_NO} "

        if [[ ${ROLLING_IMG_NO} -gt ${VERSION_PERSIST} ]] ; then
            echo "DEVOPS_NOTICE :: The Rolling Image number (ROLLING_IMG_NO) can't be greater than The Image Version"
            exit 0
        else
            cd ${WORKSPACE}/${AZURE_STORAGE_ACCOUNT}/${AZURE_STORAGE_BACKUP_CONTAINER}/
            GET_PATCH_CURRENT_VER=$(cat VERSION | tail -1 | cut -d "." -f3)
            GET_PATCH_UPDATE_VER=$(expr ${GET_PATCH_CURRENT_VER} - ${ROLLING_IMG_NO})
            export GET_CURRENT_VER=1.0.${GET_PATCH_UPDATE_VER}
            export VERSION=${GET_CURRENT_VER}
            echo "The latest Image version is : $(cat VERSION | tail -1)"
            echo "The Image version is being deploying : ${VERSION}"
        fi
      else
        export VERSION=$(cat ${WORKSPACE}/${AZURE_STORAGE_ACCOUNT}/${AZURE_STORAGE_BACKUP_CONTAINER}/VERSION | tail -1)
        echo "DEVOPS_NOTICE :: The Image version is being deploying : ${VERSION}"
      fi
      cd ${P_W_D}
}


###################################################
function npm_build() {
    if [[ -z "${ROLLING_IMG_NO}" ]] ; then
        get_version create
    else
        get_version
    fi
    echo "Building blob artifact for ${DEPLOY_ENV}-${DEPLOY_MODULE_NAME}:${VERSION} for ${DEPLOY_MODULE_NAME}"

    cd ${WORKSPACE}/${DEPLOY_MODULE_NAME}
    ${CMD_PREFIX} yarn install
    ${CMD_PREFIX} yarn build:${DEPLOY_ENV}
    cd -
    if [[ $? -ne 0 ]] ; then
      exit 1
    fi
    echo "Creating Serve Artifact with tag : ${VERSION}"
    echo "preparing DEPLOY_MODULE_NAME : ${DEPLOY_MODULE_NAME} by coping artifacts"
    ${CMD_PREFIX} cp -f ${WORKSPACE}/${AZURE_STORAGE_ACCOUNT}/${AZURE_STORAGE_BACKUP_CONTAINER}/VERSION ${WORKSPACE}/${DEPLOY_MODULE_NAME}/build/
}


#######################################
function blob_build() {
    if [[ ! -z "${ROLLING_IMG_NO}" ]] ; then
        if ls ${WORKSPACE}/${AZURE_STORAGE_ACCOUNT}/${AZURE_STORAGE_BACKUP_CONTAINER}/${VERSION} ; then
            echo "DEVOPS_NOTICE :: going back to ${VERSION} ...!"
            az storage blob delete-batch -s ${AZURE_STORAGE_CONTAINER}
            ${CMD_PREFIX} rm -rf ${WORKSPACE}/${AZURE_STORAGE_ACCOUNT}/${AZURE_STORAGE_CONTAINER}
            cp -r ${WORKSPACE}/${AZURE_STORAGE_ACCOUNT}/${AZURE_STORAGE_BACKUP_CONTAINER}/${VERSION} ${WORKSPACE}/${AZURE_STORAGE_ACCOUNT}/${AZURE_STORAGE_CONTAINER}
        else
            echo "DEVOPS_NOTICE :: ${VERSION} not found...!"
            exit 1
        fi
    else
        echo "DEVOPS_NOTICE :: Creating latest version : ${VERSION}...!"
        if [[ -d ${WORKSPACE}/${DEPLOY_MODULE_NAME}/build ]] ; then
            az storage blob delete-batch -s ${AZURE_STORAGE_CONTAINER}
            ${CMD_PREFIX} rm -rf ${WORKSPACE}/${AZURE_STORAGE_ACCOUNT}/${AZURE_STORAGE_CONTAINER}
            echo "DEVOPS_NOTICE :: Version ${UPTO_VERSION} will get deleted...!"
            az storage remove -c ${AZURE_STORAGE_BACKUP_CONTAINER} -n ${UPTO_VERSION} --recursive
            ${CMD_PREFIX} rm -rf ${WORKSPACE}/${AZURE_STORAGE_ACCOUNT}/${AZURE_STORAGE_BACKUP_CONTAINER}/${UPTO_VERSION}
            cp -r ${WORKSPACE}/${DEPLOY_MODULE_NAME}/build ${WORKSPACE}/${AZURE_STORAGE_ACCOUNT}/${AZURE_STORAGE_CONTAINER}
            cp -r ${WORKSPACE}/${AZURE_STORAGE_ACCOUNT}/${AZURE_STORAGE_CONTAINER} ${WORKSPACE}/${AZURE_STORAGE_ACCOUNT}/${AZURE_STORAGE_BACKUP_CONTAINER}/${VERSION}
        else
            echo "DEVOPS_NOTICE :: latest build for verison : ${VERSION} ; ${WORKSPACE}/${DEPLOY_MODULE_NAME}/build not found...!"
            exit 1
        fi
    fi
    echo "DEVOPS_NOTICE :: pushing latest version to blob storage : ${AZURE_STORAGE_ACCOUNT} for module : ${DEPLOY_MODULE_NAME}"
    az storage blob upload-batch -s ${WORKSPACE}/${AZURE_STORAGE_ACCOUNT}/${AZURE_STORAGE_CONTAINER} -d ${AZURE_STORAGE_CONTAINER}
    az storage blob upload-batch -s ${WORKSPACE}/${AZURE_STORAGE_ACCOUNT}/${AZURE_STORAGE_BACKUP_CONTAINER} -d ${AZURE_STORAGE_BACKUP_CONTAINER}
}


###################################################
function repos_tag() {
    export P_W_D=$PWD ; cd  ${WORKSPACE}/${DEPLOY_MODULE_NAME}
    git tag -a "${DEPLOY_ENV}-${DEPLOY_MODULE_NAME}-${VERSION}" -m "version ${DEPLOY_ENV}-${DEPLOY_MODULE_NAME}-${VERSION}"
    git push origin : ${DEPLOY_ENV}-${DEPLOY_MODULE_NAME}-${VERSION}

    echo "Deleting repository with tag : ${DEPLOY_ENV}-${DEPLOY_MODULE_NAME}-${UPTO_VERSION}"
    git tag -d ${DEPLOY_ENV}-${DEPLOY_MODULE_NAME}-${UPTO_VERSION}
    git push origin :refs/tags/${DEPLOY_ENV}-${DEPLOY_MODULE_NAME}-${UPTO_VERSION}
    cd $P_W_D
}


#######################################
function cdn_invalidation() {
  for DEPLOY_MODULE_NAME in ${DEPLOY_MODULE_NAMES[@]}; do
    if [[ ! -z ${CDN_ENDPOINT} ]]; then
      echo "DEVOPS_NOTICE :: executing function : Cloudfront invalidation for module : ${DEPLOY_MODULE_NAME}"
      az cdn endpoint purge -g ${RESOURCE_GROUP} -n ${CDN_ENDPOINT} --profile-name ${CDN_PROFILE_NAME} --content-path '/*'
    else
      echo "DEVOPS_NOTICE :: CDN_ENDPOINT is missing....!"
    fi
  done
}






repo_project_selection && \
blob_cdn_data && \
blob_clone && \
npm_build && \
blob_build && \
repos_tag && \
cdn_invalidation