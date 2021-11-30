@Library('secure-deploy') _

def CMD_PREFIX = 'sudo'
def NODE_VER = '10'
def VERSION_PERSIST = '5'
def DEPLOY_MODULE_NAME = 'offerbuilder-frontend'
def ENABLE_DEPLOY = 'true'
def SAFE_BRANCH_NAME = ''

try {
    SAFE_BRANCH_NAME = BRANCH_NAME.replaceAll(/[^0-9A-Za-z-]/, "-")
} catch (ignored) {
    SAFE_BRANCH_NAME = ""
}

properties([
        disableConcurrentBuilds(),
        [$class: "BuildDiscarderProperty", strategy: [$class: "LogRotator", daysToKeepStr: "30", numToKeepStr: "10"]],
        [$class: "GithubProjectProperty", projectUrlStr: "https://github.com/Demeure/${DEPLOY_MODULE_NAME}/"],
        [$class: "ParametersDefinitionProperty", parameterDefinitions: [
                [$class: "BooleanParameterDefinition", name: "WITH_CHECKS", defaultValue: true]
        ]]
])

//derive settings from scm branch name
switch (BRANCH_NAME) {
    case "dev":
    // choice values
    DEPLOY_ENV = 'dev'
    ROLLING_IMG_NO = ''
    // azure resources
    RESOURCE_GROUP = 'Nemo-Dev'
    // frontend values
    AZURE_STORAGE_ACCOUNT = 'nemodevui'
    CDN_ENDPOINT = 'nemo-dev'
    CDN_PROFILE_NAME = 'nemo-develop'
    ENABLE_DEPLOY = 'true'
    break
    case "master":
    // choice values
    DEPLOY_ENV = 'prod'
    ROLLING_IMG_NO = ''
    // azure resources
    RESOURCE_GROUP = 'Nemo-Prod'
    // frontend values
    AZURE_STORAGE_ACCOUNT = 'nemoprodui'
    CDN_ENDPOINT = 'nemoprod'
    CDN_PROFILE_NAME = 'nemo-prod'
    ENABLE_DEPLOY = 'true'
    break
}


if (ENABLE_DEPLOY == 'true' ) {
    node("ubuntu18-x86-64") {

        stage('Checkout') {
            sh "mkdir ${DEPLOY_MODULE_NAME}"
            dir (DEPLOY_MODULE_NAME) {
                checkout scm
            }
            checkoutSecureDeploy()
        }

        dir (DEPLOY_MODULE_NAME) {
            sh "${CMD_PREFIX} apt-get update && ${CMD_PREFIX} apt-get install -y unzip"
            SCM_REVISION = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
            echo "setting SCM_REVISION to ${SCM_REVISION}"

            BUILD_DATE = sh(returnStdout: true, script: 'date +%Y%m%d-%H%M').trim()
            echo "setting BUILD_DATE to '${BUILD_DATE}'"

            DEPLOY_VERSION = "${BUILD_DATE}-${SCM_REVISION}b${BUILD_NUMBER}"
            echo "setting DEPLOY_VERSION to ${DEPLOY_VERSION}"

            SECURE_TEMP = "/tmp/${BUILD_TAG}".trim()
            SONAR_HOME = setupSonarScanner(version: '4.2', sonarCredentialsId: '62e60ceb-7c60-45c5-8212-d728e9d4cfa3')
        }

        withEnv(["TMPDIR=/tmp/${BUILD_TAG}", "DEPLOY_VERSION=${DEPLOY_VERSION}",
                "SCM_REVISION=${SCM_REVISION}", "BUILD_DATE=${BUILD_DATE}",
                "BUILD_NUMBER=${BUILD_NUMBER}", "SAFE_BRANCH_NAME=${SAFE_BRANCH_NAME}",
                "PATH+SONAR_HOME=${SONAR_HOME}/bin", "CI=true",
                "CMD_PREFIX=${CMD_PREFIX}", "NODE_VER=${NODE_VER}",
                "DEPLOY_ENV=${DEPLOY_ENV}", "DEPLOY_MODULE_NAME=${DEPLOY_MODULE_NAME}",
                "AZURE_STORAGE_ACCOUNT=${AZURE_STORAGE_ACCOUNT}", "ROLLING_IMG_NO=${ROLLING_IMG_NO}",
                "RESOURCE_GROUP=${RESOURCE_GROUP}", "CDN_ENDPOINT=${CDN_ENDPOINT}",
                "VERSION_PERSIST=${VERSION_PERSIST}", "CDN_PROFILE_NAME=${CDN_PROFILE_NAME}"]) {

            stage('Grant execute Permission and Install OS Deps') {
                dir (DEPLOY_MODULE_NAME) {
                    sh "${CMD_PREFIX} chmod a+x os-dependency.sh build.sh && ./os-dependency.sh"
                }
            }

            stage('Test') {
            def testStatus = sh (script: "cd ${DEPLOY_MODULE_NAME} && ${CMD_PREFIX} yarn install && ${CMD_PREFIX} npm run i18n &&  ${CMD_PREFIX} yarn test -- -u  && ${CMD_PREFIX} yarn run test", returnStatus: true)

            if (testStatus != 0) {
                customError "Tests failed!"
            }
            }
            stage('SonarQube reporting') {
                status = sh(script: "cd ${DEPLOY_MODULE_NAME} && sonar-scanner -Dsonar.branch.name=${SAFE_BRANCH_NAME}", returnStatus: true )
                if(status != 0) {
                    echo 'Could not send SonarQube results!'
                }
            }

            stage('building artefact') {
                withGitCredentials {
                    withCredentials([
                            string(credentialsId: "az-client-id-${DEPLOY_ENV}", variable: 'AZ_CLIENT_ID'),
                            string(credentialsId: "az-client-secret-${DEPLOY_ENV}", variable: 'AZ_CLIENT_SECRET'),
                            string(credentialsId: "az-tenant-id-${DEPLOY_ENV}", variable: 'AZ_TENANT_ID'),
                            string(credentialsId: "az-storage-key-${DEPLOY_ENV}", variable: 'AZURE_STORAGE_KEY')
                        ]){
                    sh """az login --service-principal -u ${AZ_CLIENT_ID} -p ${AZ_CLIENT_SECRET} --tenant ${AZ_TENANT_ID}
                        cd ${WORKSPACE}/${DEPLOY_MODULE_NAME} && ./build.sh"""
                    }
                }
            }
        }
    }
} else {
    echo "ENABLE_DEPLOY is not enabled, Branch : ${BRANCH_NAME} is not authorized to perform this build..!"
}