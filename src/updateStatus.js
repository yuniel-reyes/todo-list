import { inPage } from "./pageState.js";

export default function updateStatus(currentPage) {
    for (const eachState in inPage.statePage) {
        if (eachState == currentPage) {
            inPage.statePage[eachState] = true;
        } else {
            inPage.statePage[eachState] = false;
        }
    }
}