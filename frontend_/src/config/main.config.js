
import { isDevelop } from "../js/helper/util";

export default {

    BASE_URL_LOGS: isDevelop() ? 'http:/localhost:3000/' : 'http:/localhost:3000/'

}