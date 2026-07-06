const { remote } = require('webdriverio');
const axios = require('axios');

async function runTest() {

    const driver = await remote({
        hostname: '127.0.0.1',
        port: 4723,
        path: '/',
        capabilities: {
            platformName: 'Android',
            'appium:automationName': 'UiAutomator2',
            'appium:deviceName': 'RZCXB29R55D'
        }
    });

    try {

        // Launch Santa Browser
        await driver.activateApp('com.santa.web3.browser');
        console.log("Santa Browser activated");

        await driver.pause(5000);

        // Rewards
        const rewardsBtn = await driver.$(
            'id=com.santa.web3.browser:id/rewards_btn'
        );

        await rewardsBtn.waitForDisplayed({ timeout: 20000 });
        await rewardsBtn.click();

        console.log("Rewards clicked");

        await driver.pause(5000);

        // Quests Tab
        const questsTab = await driver.$('~Quests');

        await questsTab.waitForDisplayed({ timeout: 20000 });
        await questsTab.click();

        console.log("Quests clicked");

        await driver.pause(3000);

        // Filters
        const filtersBtn = await driver.$(
            '//android.widget.Button[@text="Filters"]'
        );

        await filtersBtn.waitForDisplayed({ timeout: 20000 });
        await filtersBtn.click();

        console.log("Filters clicked");

        await driver.pause(3000);

        // Usage Filter
        const usageFilter = await driver.$(
            '//android.view.View[@text="Usage"]'
        );

        await usageFilter.waitForDisplayed({ timeout: 20000 });
        await usageFilter.click();

        console.log("Usage filter selected");

        await driver.pause(3000);

        // Apply Filter
        const applyBtn = await driver.$(
            '//android.widget.Button[@text="Apply"]'
        );

        await applyBtn.waitForDisplayed({ timeout: 20000 });
        await applyBtn.click();

        console.log("Apply clicked");

        await driver.pause(5000);

        // Scroll until Monthly Usage is visible
        await driver.$(
            'android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Usage Monthly Usage Bigger rewards for consistency In progress"))'
        );

        await driver.pause(2000);

        // Monthly Usage Quest
        const monthlyQuest = await driver.$(
            'android=new UiSelector().text("Usage Monthly Usage Bigger rewards for consistency In progress")'
        );

        await monthlyQuest.waitForDisplayed({ timeout: 20000 });

        try {
            await monthlyQuest.click();
        } catch (e) {
            await driver.execute("mobile: clickGesture", {
                elementId: monthlyQuest.elementId
            });
        }

        console.log("Monthly Usage Quest clicked");

        await driver.pause(5000);

        // ================= API Verification =================

        try {

            const response = await axios.get(
                'https://api.santabrowser.com/quests/bff/v1/quests/q.santa.system.usage-monthly/system-status?clid=dd681d267a19a23'
            );

            console.log("\n========== MONTHLY USAGE API RESPONSE ==========");
            console.log(JSON.stringify(response.data, null, 2));
            console.log("===============================================");

            if (response.data) {
                console.log("Quest Status:", response.data.status);
                console.log("Current Progress:", response.data.currentProgress);
                console.log("Target:", response.data.target);
                console.log("Completed:", response.data.completed);
            }

        } catch (apiError) {

            if (apiError.response) {

                console.log("\n========== API ERROR ==========");
                console.log("Status:", apiError.response.status);
                console.log(JSON.stringify(apiError.response.data, null, 2));

            } else {

                console.log(apiError.message);

            }
        }

        await driver.pause(3000);

        // Close Button (Accessibility ID = Close)
        const closeBtn = await driver.$('~Close');

        await closeBtn.waitForDisplayed({ timeout: 10000 });

        try {
            await closeBtn.click();
        } catch (e) {
            await driver.execute("mobile: clickGesture", {
                elementId: closeBtn.elementId
            });
        }

        console.log("Close button clicked");

        await driver.pause(3000);

    } catch (error) {

        console.error("Test Failed:", error);

        try {
            const source = await driver.getPageSource();
            console.log(source);
        } catch (e) {}

    } finally {

        await driver.deleteSession();

    }

}

runTest().catch(console.error);