# MintRooms

# Front end code 

## For hotel Admin (react)
> XRPL_ADMIN / xrpl-admin

Run `npm start` , to spin-up the front end app for the hotel admin ui at port 3000

## For Renter (react)
> XRPL_USER / xrpl-user
 
Run `npm start` , to spin-up the front end app for the renter ui at port 5000

## For Backed , (Nodejs)

> XRPL_ADMIN / xrpl-backend

Run `npm start`, to spin-up the backend server at port 4000

Make a `.env` file which holds these values
```
MONGODB_URI=mongodb+srv://<username>:<password>@realmcluster.uc7kw.mongodb.net/XRPL?retryWrites=true&w=majority


## Mintroom  contract
seed=<account seed> # starts with s
xrpaddr=<public aadr> # start with r

```

>  # [Youtube Video Link](https://youtu.be/8Qm5_rw7cFE)
## Inspiration
The idea came to mind realising that we have the opportunity to issue  something that can be ownable  and publicly verifiable with the help of blockchain technology . There is a gap in the real world computation speed and what   blockains are capable  of, there are some limitations in terms of speed and cost.Using the leverage of the Ripple XLS-20d, these market gaps can be filled up.


## What it does

This project aims to help hotel admins to take back their share in the market place , using this hotel booking system they can rely less and less on the middle man and the payment processors in terms of  fees, hotel admins have a capability of moving their rooms NFTs to other Broker/Minter who charges less share of revenue and attracts users with their cashback programmes improving theri hotel occupancy . They can even find the online open sourced code to mint their own NFT and eliminate the middleman and the payment gateways altogether.  

## How we built it

The techstack used in this app are react, nodejs, xrpljs and xumm-sdk. The ripple doc page is very helpful with more examples explaining code line by line and going in depth details and takeaways ahead.

This architecture explains the app flow

https://postimg.cc/WdTvS74P

## Accomplishments that we're proud of

Implemented a library in nodej  that will interact and get data the is needed, just like a blockchain explorer does, that feels challenging and felt great

## What we learned

I learnt how to use the XRPL ledger API and methods ,xls20d NFT minter functions.I leant the life cycle from  NFT token creation and mint to tranfer/trade to burning.

## What's next for Mint Rooms

Have to refine the code,Even need to explore more possible cases where we need to fit this more efficient way. Looking forward to implement a comment NFT system where users can own the NFT that are attached to the current NFT they own, so hotel admins and brokers cannot tamper the reviews, and one can easily verify is user doing the fake review by verifying his ownership to the NFT id. This the big issue that current hotel owners are facing.

