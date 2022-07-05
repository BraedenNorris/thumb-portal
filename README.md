## Thumb Portal
This is a small project I worked on to learn more about smart contract development on Ethereum. It is based on [this course from Buildspace.](https://buildspace.so/p/build-solidity-web3-app)

I decided to modify the project by opting to use a more full featured wallet connecter method in [RainbowKit](https://www.rainbowkit.com/). Behind the scenes RainbowKit uses [wagmi](https://github.com/tmm/wagmi) which is a React Hooks library for Ethereum. Using Hooks for wallet operations felt more natural than the basic Metamask connector javascript.

For the styling I opted to use [NextUI](https://nextui.org/) as it is a simple and customizable React UI library.

Finally, the website is deployed on Vercel which is definetly the easiest way to get a Next.js app up and running.