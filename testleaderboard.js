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

        // Click Rank tab
        const rankTab = await driver.$('~Rank');

        await rankTab.waitForExist({ timeout: 15000 });
        await rankTab.click();
        console.log("Rank clicked");

        await driver.pause(3000);

        // ==========================
        // Individual Rank
        // ==========================

        const weekly = await driver.$(
            '//android.widget.Button[@text="Weekly"]'
        );
        await weekly.waitForExist({ timeout: 15000 });
        await weekly.click();
        console.log("Weekly clicked");

        await driver.pause(3000);

        const monthly = await driver.$(
            '//android.widget.Button[@text="Monthly"]'
        );
        await monthly.waitForExist({ timeout: 15000 });
        await monthly.click();
        console.log("Monthly clicked");

        await driver.pause(3000);

        const yearly = await driver.$(
            '//android.widget.Button[@text="Yearly"]'
        );
        await yearly.waitForExist({ timeout: 15000 });
        await yearly.click();
        console.log("Yearly clicked");

        await driver.pause(3000);

        const all = await driver.$(
            '(//android.widget.Button[@text="All"])[1]'
        );
        await all.waitForExist({ timeout: 15000 });
        await all.click();
        console.log("All clicked");

        await driver.pause(3000);

        // ==========================
        // Crew Rank
        // ==========================

        const crew = await driver.$(
            '//android.widget.Button[@text="Crew"]'
        );
        await crew.waitForExist({ timeout: 15000 });
        await crew.click();
        console.log("Crew clicked");

        await driver.pause(3000);

        const crewWeekly = await driver.$(
            '//android.widget.Button[@text="Weekly"]'
        );
        await crewWeekly.waitForExist({ timeout: 15000 });
        await crewWeekly.click();
        console.log("Crew Weekly clicked");

        await driver.pause(3000);

        const crewMonthly = await driver.$(
            '//android.widget.Button[@text="Monthly"]'
        );
        await crewMonthly.waitForExist({ timeout: 15000 });
        await crewMonthly.click();
        console.log("Crew Monthly clicked");

        await driver.pause(3000);

        const crewYearly = await driver.$(
            '//android.widget.Button[@text="Yearly"]'
        );
        await crewYearly.waitForExist({ timeout: 15000 });
        await crewYearly.click();
        console.log("Crew Yearly clicked");

        await driver.pause(3000);

        const crewAll = await driver.$(
            '(//android.widget.Button[@text="All"])[1]'
        );
        await crewAll.waitForExist({ timeout: 15000 });
        await crewAll.click();
        console.log("Crew All clicked");

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