describe("appWithRedux", () => {
  it("base example, visually looks correct", async () => {
    // APIs from jest-puppeteer
    await page.goto(
      "http://localhost:9009/iframe.html?args=&id=appwithredux-component--app-with-redux-example&viewMode=story"
    );
    const image = await page.screenshot();

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot();
  });
});
