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

        // Quests
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

        // Usage
        const usageFilter = await driver.$(
            '//android.view.View[@text="Usage"]'
        );

        await usageFilter.waitForDisplayed({ timeout: 20000 });
        await usageFilter.click();

        console.log("Usage clicked");

        await driver.pause(3000);

        // Apply
        const applyBtn = await driver.$(
            '//android.widget.Button[@text="Apply"]'
        );

        await applyBtn.waitForDisplayed({ timeout: 20000 });
        await applyBtn.click();

        console.log("Apply clicked");

        await driver.pause(5000);

        // Weekly Usage Quest
        const weeklyQuest = await driver.$(
            '//android.widget.Button[@text="Usage Weekly Usage Keep your streak going In progress"]'
        );

        await weeklyQuest.waitForExist({ timeout: 20000 });

        try {
            await weeklyQuest.click();
        } catch {
            await driver.execute("mobile: clickGesture", {
                elementId: weeklyQuest.elementId
            });
        }

        console.log("Weekly Usage Quest clicked");

        await driver.pause(5000);

        // Close / Continue button
        const closeBtn = await driver.$(
            '//android.widget.Button'
        );

        await closeBtn.waitForExist({ timeout: 20000 });

        try {
            await closeBtn.click();
        } catch {
            await driver.execute("mobile: clickGesture", {
                elementId: closeBtn.elementId
            });
        }

        console.log("Button clicked");

        await driver.pause(3000);

        // API Verification

        try {

            const response = await axios.get(
                'https://api.santabrowser.com/quests/bff/v1/quests/q.santa.system.usage/system-status?clid=dd681d267a19a23'
            );

            console.log("\n========== WEEKLY USAGE API RESPONSE ==========");
            console.log(JSON.stringify(response.data, null, 2));
            console.log("===============================================");

        } catch (apiError) {

            if (apiError.response) {

                console.log("\n========== API ERROR ==========");
                console.log("Status:", apiError.response.status);
                console.log(JSON.stringify(apiError.response.data, null, 2));

            } else {

                console.log(apiError.message);

            }
        }

        await driver.pause(5000);

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