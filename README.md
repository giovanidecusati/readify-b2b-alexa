# Say "Hello" to Alexa!

| The material utilized on Readify Back2Base talk about Alexa on 03/08/18.

## Goals
I created a .NET Core Web Application (MVC) to store user names into an in-memory EntityFramework instance and available a random user name API to "rafle" an user. Thus, I could created an Alexa Skill (App) to Alexa recognize user voice commands and makes HTTP request throught raffle API.

* [Download ReadifyB2B-Alexa.pptx](./ReadifyB2B-Alexa.pptx)

## How to Start
Clone the repository:
```
$ git clone https://github.com/giovanidecusati/readify-b2b-alexa.git
```
In the terminal access the directory (./src/raffleweb) and deploy your application on a public address to be accessed by Alexa Skill.

Access Alexa Skill directory (./src/raffleskill) and connect to your Amazon Developer Account. You need to create [AWS account](https://console.aws.amazon.com) and [developer account](https://developer.amazon.com).
```
$ cd readify-b2b-alexa/src/RaffleSkill/
$ ask init
```
Change API Url on file [lambda\custom\index.js](.src\RaffleSkill\lambda\custom\index.js) to match your API URL.

Now you can deploy and test this skill on Amazon Developer Console.
```
$ ask deploy
```

## References
* [AWS Alexa Developer Console](https://developer.amazon.com/alexa/console/ask)
* [AWS Lambda Console](https://console.aws.amazon.com/lambda/home?region=us-east-1&#/functions)
* [AI Faceoff: Siri vs. Cortana vs. Google Assistant vs. Alexa](https://www.businessnewsdaily.com/10315-siri-cortana-google-assistant-amazon-alexa-face-off.html)
* [Harman Kardon Invoke](https://au.pcmag.com/harman-kardon-invoke/50169/review/harman-kardon-invoke)
* [THE 5 BEST SMART SPEAKERS WITH ALEXA AND GOOGLE](https://www.wired.com/story/best-smart-speakers/)
* [New Alexa Technical Tutorial: Debugging AWS Lambda Code Locally](https://developer.amazon.com/blogs/post/tx24z2qzp5rrtg1/new-alexa-technical-tutorial-debugging-aws-lambda-code-locally
)
* [How chatbots like Siri will get smarter](https://www.cio.com/article/3149087/artificial-intelligence/how-chatbots-like-siri-will-get-smarter.html
)
* [11 Amazing Facts You Might Not Know About Chatbots](https://medium.com/marketing-and-entrepreneurship/11-amazing-facts-you-might-not-know-about-chatbots-8cdf331181f8)