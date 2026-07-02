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
        console.log('Santa Browser activated');

        await driver.pause(5000);

        // Click Rewards button
        const rewardsBtn = await driver.$(
            'id=com.santa.web3.browser:id/rewards_btn'
        );

        await rewardsBtn.waitForExist({ timeout: 15000 });
        await rewardsBtn.click();
        console.log('Rewards button clicked');

        await driver.pause(5000);

        // Click Quests tab
        const questsTab = await driver.$('~Quests');
        await questsTab.waitForExist({ timeout: 15000 });
        await questsTab.click();
        console.log('Quests clicked');

        await driver.pause(3000);

        // Click Filters
        const filtersBtn = await driver.$(
            '//android.widget.Button[@text="Filters"]'
        );

        await filtersBtn.waitForExist({ timeout: 15000 });
        await filtersBtn.click();
        console.log('Filters clicked');

        await driver.pause(3000);

        // Click Usage filter
        const usageFilter = await driver.$(
            '//android.view.View[@text="Usage"]'
        );

        await usageFilter.waitForExist({ timeout: 15000 });
        await usageFilter.click();
        console.log('Usage filter clicked');

        await driver.pause(3000);

        // Click Apply
        const applyBtn = await driver.$(
            '//android.widget.Button[@text="Apply"]'
        );

        await applyBtn.waitForExist({ timeout: 15000 });
        await applyBtn.click();
        console.log('Apply clicked');

        await driver.pause(3000);

        // Click Daily Usage quest
        const dailyUsageQuest = await driver.$(
            '//android.widget.Button[@text="Usage Daily Usage Earn points for browsing In progress"]'
        );

        await dailyUsageQuest.waitForExist({ timeout: 15000 });
        await dailyUsageQuest.click();
        console.log('Daily Usage quest clicked');

        await driver.pause(3000);

        // Click first button
        const button = await driver.$('//android.widget.Button');

        await button.waitForExist({ timeout: 15000 });
        await button.click();
        console.log('Button clicked');

        await driver.pause(3000);

        // ==========================
        // API Verification
        // ==========================

        try {
            const response = await axios.get(
                'https://api.santabrowser.com/quests/bff/v1/quests/q.santa.system.usage-daily/system-status?clid=dd681d267a19a23'
            );

            console.log('\n========== API RESPONSE ==========');
            console.log(JSON.stringify(response.data, null, 2));
            console.log('==================================\n');

        } catch (apiError) {

            if (apiError.response) {
                console.log('\n========== API ERROR ==========');
                console.log('Status:', apiError.response.status);
                console.log(JSON.stringify(apiError.response.data, null, 2));
                console.log('===============================\n');
            } else {
                console.log('API Request Failed:', apiError.message);
            }
        }

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