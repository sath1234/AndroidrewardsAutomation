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

        // Rewards
        const rewardsBtn = await driver.$(
            'id=com.santa.web3.browser:id/rewards_btn'
        );

        await rewardsBtn.waitForDisplayed({ timeout: 20000 });

        try {
            await rewardsBtn.click();
        } catch (e) {
            await driver.execute("mobile: clickGesture", {
                elementId: rewardsBtn.elementId
            });
        }

        console.log("Rewards clicked");

        await driver.pause(4000);

        // First Toggle
        const toggle1 = await driver.$('//android.widget.ToggleButton');

        await toggle1.waitForDisplayed({ timeout: 20000 });

        try {
            await toggle1.click();
        } catch (e) {
            await driver.execute("mobile: clickGesture", {
                elementId: toggle1.elementId
            });
        }

        console.log("First Toggle clicked");

        await driver.pause(2000);

        // Spaces
        const spaces1 = await driver.$(
            '//android.widget.TextView[@text="Spaces"]'
        );

        await spaces1.waitForDisplayed({ timeout: 20000 });

        try {
            await spaces1.click();
        } catch (e) {
            await driver.execute("mobile: clickGesture", {
                elementId: spaces1.elementId
            });
        }

        console.log("Spaces clicked");

        await driver.pause(3000);

        // Santa 18 Quests
        const santa = await driver.$(
            '//android.widget.TextView[contains(@text,"Santa")]'
        );

        await santa.waitForDisplayed({ timeout: 20000 });

        try {
            await santa.click();
        } catch (e) {
            await driver.execute("mobile: clickGesture", {
                elementId: santa.elementId
            });
        }

        console.log("Santa selected");

        await driver.pause(3000);

        // Second Toggle
        const toggle2 = await driver.$('//android.widget.ToggleButton');

        await toggle2.waitForDisplayed({ timeout: 20000 });

        try {
            await toggle2.click();
        } catch (e) {
            await driver.execute("mobile: clickGesture", {
                elementId: toggle2.elementId
            });
        }

        console.log("Second Toggle clicked");

        await driver.pause(2000);

        // Spaces Again
        const spaces2 = await driver.$(
            '//android.widget.TextView[@text="Spaces"]'
        );

        await spaces2.waitForDisplayed({ timeout: 20000 });

        try {
            await spaces2.click();
        } catch (e) {
            await driver.execute("mobile: clickGesture", {
                elementId: spaces2.elementId
            });
        }

        console.log("Spaces clicked again");

        await driver.pause(3000);

        // Aptos 2 Quests
        const aptos = await driver.$(
            '//android.widget.TextView[contains(@text,"Aptos")]'
        );

        await aptos.waitForDisplayed({ timeout: 20000 });

        try {
            await aptos.click();
        } catch (e) {
            await driver.execute("mobile: clickGesture", {
                elementId: aptos.elementId
            });
        }

        console.log("Aptos selected");

        await driver.pause(4000);

        // ==========================
        // Home (Accessibility ID)
        // ==========================
        const home = await driver.$('~Home');

        await home.waitForDisplayed({ timeout: 20000 });

        try {
            await home.click();
        } catch (e) {
            await driver.execute("mobile: clickGesture", {
                elementId: home.elementId
            });
        }

        console.log("Home clicked");

        await driver.pause(5000);

        console.log("Test completed successfully.");

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