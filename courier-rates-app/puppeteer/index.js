const puppeteer = require("puppeteer");

module.exports = {
  async getJntRates(req, res) {
    const screenWidth = 1024;
    const screenHeight = 1600;
    const initialPage = "https://www.jtexpress.my/shipping-rates";
    const reqBody = req.body;
    // user input
    const {
      origin_postcode,
      destination_postcode,
      length,
      width,
      height,
      parcel_weight,
    } = reqBody;
    const browser = await puppeteer.launch({
      defaultViewport: { width: screenWidth, height: screenHeight },
    });
    const page = await browser.newPage(browser);

    page.setDefaultNavigationTimeout(90000);

    try {
      await page.setViewport({ width: screenWidth, height: screenHeight });

      await page.setUserAgent("UA-TEST");

      await page.goto(initialPage);

      await page.type("#sender_postcode", origin_postcode);

      await page.type("#receiver_postcode", destination_postcode);

      await page.type("#weight", parcel_weight);

      await page.type("#length", length);

      await page.type("#width", width);

      await page.type("#height", height);

      const button = await page.$("#btn-form-rates-submit");
      await button.evaluate((b) => b.click());

      page.on("response", async (response) => {
        if (response.url() == "https://www.jtexpress.my/shipping-rates") {
          response.buffer().then(
            async (b) => {
              const HTMLres = await response.text();
              res.send(HTMLres);
            },
            (e) => {
              console.error(
                `${response.status()} ${response.url()} failed: ${e}`
              );
              res.status(400);
            }
          );
        }
      });

      await page.screenshot({ path: "jntRates.png", fullPage: true });

      await browser.close();
    } catch (error) {
      res.status(400);
      req.send(error);
    }
  },
};
