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
        console.log('Santa Browser activated');

        await driver.pause(5000);

        // Click Rewards button on home page
        const rewardsBtn = await driver.$(
            'id=com.santa.web3.browser:id/rewards_btn'
        );

        await rewardsBtn.waitForExist({ timeout: 15000 });
        await rewardsBtn.click();

        console.log('Rewards button clicked');

        await driver.pause(5000);

        // Click Quests
        const questsTab = await driver.$('~Quests');
        await questsTab.waitForExist({ timeout: 15000 });
        await questsTab.click();

        console.log('Quests clicked');

        await driver.pause(3000);

        // Click Rewards tab
        const rewardsTab = await driver.$('~Rewards');
        await rewardsTab.waitForExist({ timeout: 15000 });
        await rewardsTab.click();

        console.log('Rewards tab clicked');

        await driver.pause(3000);

        // Click Rank tab
        const rankTab = await driver.$('~Rank');
        await rankTab.waitForExist({ timeout: 15000 });
        await rankTab.click();

        console.log('Rank tab clicked');

        await driver.pause(5000);

    } catch (error) {
        console.error('Test Failed:', error);

        try {
            const source = await driver.getPageSource();
            console.log(source);
        } catch (e) {
            console.log('Unable to get page source');
        }
    } finally {
        await driver.deleteSession();
    }
}

runTest().catch(console.error);