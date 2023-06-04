import tester from '@dword-design/tester'
import testerPluginPuppeteer from '@dword-design/tester-plugin-puppeteer'
import express from 'express'

import self from './index.js'

export default tester(
  {
    async works() {
      const server = express()
        .get('/', (req, res) =>
          res.send(
            '<button style="transition: 500ms opacity; opacity: 1" onclick="this.style.opacity = 0" />',
          ),
        )
        .listen(3000)
      try {
        await this.page.goto('http://localhost:3000')

        const button = await this.page.waitForSelector('button')
        expect(await button.evaluate(el => el.style.opacity)).toEqual('1')
        await button.click()
        await self(button)
        expect(await button.evaluate(el => el.style.opacity)).toEqual('0')
      } finally {
        server.close()
      }
    },
  },
  [testerPluginPuppeteer()],
)
