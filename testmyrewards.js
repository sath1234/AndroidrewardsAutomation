const { remote } = require('webdriverio');

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

        // Click Rewards button
        const rewardsBtn = await driver.$(
            'id=com.santa.web3.browser:id/rewards_btn'
        );

        await rewardsBtn.waitForExist({ timeout: 15000 });
        await rewardsBtn.click();
        console.log("Rewards button clicked");

        await driver.pause(5000);

        // Click Rewards tab
        const rewardsTab = await driver.$('~Rewards');

        await rewardsTab.waitForExist({ timeout: 15000 });
        await rewardsTab.click();
        console.log("Rewards category clicked");

        await driver.pause(3000);

        // Click Transaction History
        const transactionHistory = await driver.$(
            '//android.view.View[@resource-id="rewards-tab-transactions"]'
        );

        await transactionHistory.waitForExist({ timeout: 15000 });
        await transactionHistory.click();
        console.log("Transaction History clicked");

        await driver.pause(3000);

        // Click Quest History
        const questHistory = await driver.$(
            '//android.view.View[@resource-id="rewards-tab-quests"]'
        );

        await questHistory.waitForExist({ timeout: 15000 });
        await questHistory.click();
        console.log("Quest History clicked");

        await driver.pause(3000);

        // ==========================
        // Event Awards
        // ==========================

        const eventAwards = await driver.$(
            '//android.widget.Button[@text="Event Awards"]'
        );

        await eventAwards.waitForExist({ timeout: 15000 });
        await eventAwards.click();
        console.log("Event Awards clicked");

        await driver.pause(3000);

        const clicks = await driver.$(
            '//android.view.View[@text="Clicks"]'
        );

        await clicks.waitForExist({ timeout: 15000 });
        await clicks.click();
        console.log("Clicks clicked");

        await driver.pause(3000);

        const impressions = await driver.$(
            '//android.view.View[@text="Impressions"]'
        );

        await impressions.waitForExist({ timeout: 15000 });
        await impressions.click();
        console.log("Impressions clicked");

        await driver.pause(3000);

        const misc = await driver.$(
            '//android.view.View[@text="Misc"]'
        );

        await misc.waitForExist({ timeout: 15000 });
        await misc.click();
        console.log("Misc clicked");

        await driver.pause(3000);

        const all = await driver.$(
            '//android.view.View[@text="All"]'
        );

        await all.waitForExist({ timeout: 15000 });
        await all.click();
        console.log("All clicked");

        await driver.pause(3000);

        // ==========================
        // Quest Completions
        // ==========================

        const questCompletions = await driver.$(
            '//android.widget.Button[@text="Quest Completions"]'
        );

        await questCompletions.waitForExist({ timeout: 15000 });
        await questCompletions.click();
        console.log("Quest Completions clicked");

        await driver.pause(3000);

        // ==========================
        // Referral Rewards
        // ==========================

        const referralRewards = await driver.$(
            '//android.widget.Button[@text="Referral Rewards"]'
        );

        await referralRewards.waitForExist({ timeout: 15000 });
        await referralRewards.click();
        console.log("Referral Rewards clicked");

        await driver.pause(3000);

        // ==========================
        // Playwall History
        // ==========================

        const playwallHistory = await driver.$(
            '//android.view.View[@resource-id="rewards-tab-playwall"]'
        );

        await playwallHistory.waitForExist({ timeout: 15000 });
        await playwallHistory.click();
        console.log("Playwall History clicked");

        await driver.pause(3000);

        // ==========================
        // Cashback History
        // ==========================

        const cashbackHistory = await driver.$(
            '//android.view.View[@resource-id="rewards-tab-cashback"]'
        );

        await cashbackHistory.waitForExist({ timeout: 15000 });
        await cashbackHistory.click();
        console.log("Cashback History clicked");

        await driver.pause(5000);

    } catch (error) {

        console.error("Test Failed:", error);

        try {
            const source = await driver.getPageSource();
            console.log(source);
        } catch (e) {
            console.log("Unable to get page source");
        }

    } finally {

        await driver.deleteSession();
    }
}

runTest().catch(console.error);