const faker = require('faker');
const puppeteer = require('puppeteer');

// Global Variables
let browser
let page
const test_user = {
  name:faker.name.firstName(),
  role:faker.name.jobTitle(),
  project:faker.company.companyName()
}

// Given Miscellanous loading time for the webpage
jest.setTimeout(120000)

// Uncomment this for Visual Debugging
// beforeAll(async () => {
//   browser = await puppeteer.launch({
//     headless: false,
//     slowMo: 40
//   })
//   page = await browser.newPage()
// })

beforeAll(async () => {
  browser = await puppeteer.launch()
  page = await browser.newPage()
})

// Close Puppeteer after the tests are done
afterAll(() => {
  browser.close()
})

describe('Front pages functionality test',()=>{
    test('Should take the input from user and save it to the db correctly',async ()=>{
      await page.goto('http://localhost:3000')
      await page.waitForSelector("#name",{timeout:120000})
      await page.type("#name",test_user.name)
      await page.type("#role",test_user.role)
      await page.type("#project",test_user.project)
      await page.click("#addUser");
      var isPersonAdded = false;
      await page.waitForSelector("#userName");
      var isPersonAdded = 0;
      await document.querySelectorAll("#userName").forEach(element =>{
        if(element.innerText == test_user.name){
          isPersonAdded = isPersonAdded++;
        }
      })
      expect(isPersonAdded).toBeLessThanOrEqual(1);
    })
    test('Should give an error on no data in fields',async ()=>{
      await page.goto('http://localhost:3000')
      await page.click("#addUser");
      await page.waitForSelector("#noDataError");
    })
    test('Should give an error on wrong entry',async ()=>{
      await page.type("#name",test_user.name)
      await page.type("#role",test_user.role);
      await page.type("#project",test_user.project)
      await page.click("#addUser");
      await page.waitForSelector("#userName");
      var isPersonAdded = 0;
      await document.querySelectorAll("#userName").forEach(element =>{
        if(element.innerText == test_user.name){
          isPersonAdded = isPersonAdded++;
        }
      })
      expect(isPersonAdded).toBeLessThanOrEqual(1);
    })
  })