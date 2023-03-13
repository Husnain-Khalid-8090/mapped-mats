import { combineReducers } from "redux";
import home from "~/modules/home/services";
import auth from "~/modules/auth/services";
import dashboard from "../../modules/adminDashboard/services"

/**
 * all available reducers are wrapped by the combine reducers function
 */

const rootReducer = combineReducers({
  home,
  auth,
  dashboard
});

export default rootReducer;
