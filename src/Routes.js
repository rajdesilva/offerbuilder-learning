import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import OfferList from "./pages/offers/components/OfferList";
import { BasicSearch } from "./pages/basicSearch/components";
import { BrowseSupply } from "./pages/browseSupply/components";
import ErrorBoundary from "./common/ErrorBoundary";
import NotFound from "./common/NotFound";
import CreateNewOffer from "./pages/offers/components/CreateNewOffer";
import OfferCreatedSuccess from "./pages/offers/components/OfferCreatedSuccess";
import OfferEdit from "./pages/offers/components/OfferEdit";
import { UserManagement } from "./pages/user/components";
import AddUser from "./pages/user/components/AddUser";
import { AccessDenied, UserConfirmation } from "./common";
import { PropertyDetailInfoPage, ViewOffer } from "./pages/offers/components";

import { resetApplicationReduxAndStorage } from "./helpers/utility";
import { baseURL } from "./helpers";

function Routes() {
  return (
    <ErrorBoundary>
      <Switch>
        <Route exact path={["/", "/offers"]}>
          <OfferList />
        </Route>
        <Route path="/offers/create-new-offer/:step?">
          <CreateNewOffer />
        </Route>
        <Route path="/user-management/list">
          <UserManagement />
        </Route>
        <Route path="/user-management/add-user">
          <AddUser />
        </Route>
        <Route path="/offers/offer-created/:offerId?">
          <OfferCreatedSuccess />
        </Route>
        <Route path="/property/:propertyId?">
          <PropertyDetailInfoPage />
        </Route>
        <Route path="/offers/view/:offerId?">
          <ViewOffer />
        </Route>
        <Route path="/offers/edit/:offerId?">
          <OfferEdit />
        </Route>
        <Route path="/basic-search/:subpath?">
          <BasicSearch />
        </Route>
        
        <Route path="/browse-supply/:subpath?">
          <BrowseSupply />
        </Route>
        <Route path="/access-denied">
          <AccessDenied />
        </Route>
        <Route
          path="/logout"
          render={() => {
            resetApplicationReduxAndStorage();
            window.location.href = `${baseURL.API_URL_BASE}logout`;
            return <Fragment />;
          }}
        />
        <Route
          path="/refresh"
          exact
          render={() => {
            const resetApp = async () => {
              await resetApplicationReduxAndStorage();
              window.location.href = `/`;
            };
            resetApp();
            return <Fragment />;
          }}
        />

        <Route path="*" exact={true}>
          <NotFound />
        </Route>
      </Switch>
      <UserConfirmation />
    </ErrorBoundary>
  );
}

export default Routes;
