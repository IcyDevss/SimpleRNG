var dict = new Object();

var dict = {
    "Common": {
        "Chance": 2,
        "Owned": false,
        //"Color": Fore.CYAN
    },
    "Uncommon": {
        "Chance": 2**2,
        "Owned": false,
        //"Color": Fore.LIGHTGREEN_EX
    },
    "Rare": {
        "Chance": 2**3,
        "Owned": false,
        //"Color": Fore.BLUE
    },
    "Rage": {
        "Chance": 2**4,
        "Owned": false,
        //"Color": Fore.RED
    },
    "Crystal": {
        "Chance": 2**5,
        "Owned": false,
        //"Color": Fore.MAGENTA
    },
    "Ruby": {
        "Chance": 2**6,
        "Owned": false,
        //"Color": Fore.LIGHTRED_EX
    },
    "Glitch": {
        "Chance": 2**7,
        "Owned": false,
        //"Color": Fore.GREEN
    },
    "Hero": {
        "Chance": 2**8,
        "Owned": false,
        //"Color": Fore.CYAN
    },
    "Love": {
        "Chance": 2**9,
        "Owned": false,
        //"Color": Fore.RED
    },
    "Precious": {
        "Chance": 2**10,
        "Owned": false,
        //"Color": Fore.CYAN
    },
    "Crazy": {
        "Chance": 2**11,
        "Owned": false,
        //"Color": Fore.RED
    },
    "_UNDERSCORE_": {
        "Chance": 2**12,
        "Owned": false,
        //"Color": Fore.BLUE
    },
    "Undead": {
        "Chance": 2**13,
        "Owned": false,
        //"Color": Fore.GREEN
    },
    "Mother": {
        "Chance": 2**14,
        "Owned": false,
        //"Color": Fore.MAGENTA
    },
}
// Your dictionary and Call function here...

function getRandomAura() {
    var a = Math.floor(Math.random() * 1000000) + 1;
    var selectedKey = "";
    var AuraChance = "";

    for (var key in dict) {
        if (dict.hasOwnProperty(key)) {
            var chance = dict[key]["Chance"];
            var b = 1000000 / chance;
            
            if (a >= b) {
                selectedKey = key;
                AuraChance = chance;
                break;
            }
        }
    }

    return selectedKey +" 1/"+ AuraChance;
}

function GetAura() {
    var auraType = getRandomAura();
    document.getElementById("auraText").innerHTML = auraType;
}



