const puppeteer = require("puppeteer");
const id = "feyodon475@shzsedu.com";
const pw = "shzsedu475";
const { PendingXHR } = require("pending-xhr-puppeteer");


(async function(){
    let browser = await puppeteer.launch({
        headless: false,
        slowMo: 25,
        defaultViewport: null,
        args: ["--start-maximized"],
      }); // 10 sec
    let allPages = await browser.pages();
    let tab = allPages[0];
    await tab.goto("https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin");
    await tab.type("#username", id);
    await tab.type("#password", pw);
    await tab.click(".btn__primary--large.from__button--floating");

     // delay
     await tab.waitForTimeout(000);

    // Navigates to the post
    await tab.goto("https://www.linkedin.com/posts/neha-jain-967690164_i-am-really-excited-to-share-that-ill-be-activity-6773159447314362369-NvfT");
    const reactions = await tab.waitForSelector('[aria-label="See more reactions"]');
    await reactions.click();
    const likes = await tab.waitForXPath("/html/body/div[4]/div/div/div[1]/div/div/div/button[2]");
    await likes.click();

    // Getting count of likes
    const likeCount = await tab.evaluate(() => {
    return parseInt(
        document.getElementsByClassName(
        "social-details-reactors-tab__icon-container"
        )[1].innerText
    );
    });


    await tab.evaluate(_ => {
    window.scrollBy(0, window.innerHeight);
    });


    for (let i = 1; i <= likeCount; i++) {
    let profile = await tab.waitForXPath(
        `/html/body/div[4]/div/div/div[2]/div/div/ul/li[` + `${i}` + `]/a/div`
    );
    console.log(i);
    await profile.click();

    const getNewPageWhenLoaded = async () => {
        return new Promise((x) =>
        browser.once("targetcreated", async (target) => {
            if (target.type() === "page") {
            const profilePage = await target.page();
            const profilePagePromise = new Promise((y) =>
                profilePage.once("domcontentloaded", () => y(profilePage))
            );
            const isPageLoaded = await profilePage.evaluate(
                () => document.readyState
            );
            await profilePage._client.send(
                "Emulation.clearDeviceMetricsOverride"
            );
            return isPageLoaded.match("complete|interactive")
                ? x(profilePage)
                : x(profilePagePromise);
            }
        })
        );
    };


    const profilePagePromise = getNewPageWhenLoaded();
    const profilePage = await profilePagePromise;
    const pendingXHR = new PendingXHR(profilePage);

    // if unfollow button is not found, close the tab
    try {
        const moreBtn = await profilePage.waitForXPath(
        "/html/body/div[7]/div[3]/div/div/div/div/div[2]/div/main/div/div[1]/section/div[2]/div[1]/div[2]/div/div/div[2]/div/button",
        { timeout: 3000 }
        );

        await moreBtn.click();
        
        const unfollowTxt = await profilePage.evaluate(() => {
        return document.getElementsByClassName("pv-s-profile-actions__label")[6]
            .innerHTML;
        });

        let unfollow = await profilePage.waitForXPath(
        "/html/body/div[7]/div[3]/div/div/div/div/div[2]/div/main/div/div[1]/section/div[2]/div[1]/div[2]/div/div/div[2]/div/div/div/ul/li[6]",
        { timeout: 3000 }
        );

        // console.log(unfollow);
        if (unfollowTxt === "Follow") {
        await unfollow.click();
        console.log("Unfollowing this person");
        await pendingXHR.waitForAllXhrFinished();
        } else {
        console.log("Unfollow button not found");
        }
        await profilePage.close();
    }catch (e) {
        await profilePage.close();
        console.log("Unfollow button not found", e);
    }
    }

})(); 