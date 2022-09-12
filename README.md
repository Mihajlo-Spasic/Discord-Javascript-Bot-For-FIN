# Discord-Javascript-Bot-For-FIN

This bot is made only for the purpose of our faculty discord server  

## Included slash commands are as follows:
### /father  
Outputs the name of the creator of this bot

### /ispiti (godina)  
Outputs all the exams in the current term for the given year

### /ispiti (month)  
Outputs all the exams that happened or will happen depending on the given month  
(function still not developed)  

Work in progress   
Subject to change 



### Additional features to add:  
- Logging every input into a separate file for error purposes   
- Finishing **/ispiti** 






#
This bot is open source and you are allowed to adjust it for your needs. To configure and use this bot all you need is addidtional json file called <code>./config.json</code> with the token variable of your applciation bot, along side UserID and ClientID. For data comming from our faculty you will need to configure <code>FINdata.py</code> file with new or existing code for scraping the website of your desire, if you decide to do so, you can also add username/password in <code>./config.json</code> file used for automatic login to the server. 
