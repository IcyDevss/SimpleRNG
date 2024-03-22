//var's, let's, const's
var dict = {
    //"Secret": {
        //"Chance": 0,
        //"Owned": false,
    //},
    "Common": {
        "Chance": 2,
        "Owned": false,
    },
    "Uncommon": {
        "Chance": 2**2,
        "Owned": false,
    },
    "Rare": {
        "Chance": 2**3,
        "Owned": false,
    },
    "Rage": {
        "Chance": 2**4,
        "Owned": false,
    },
    "Crystal": {
        "Chance": 2**5,
        "Owned": false,
    },
    "Ruby": {
        "Chance": 2**6,
        "Owned": false,
    },
    "Glitch": {
        "Chance": 2**7,
        "Owned": false,
    },
    "Hero": {
        "Chance": 2**8,
        "Owned": false,
    },
    "Love": {
        "Chance": 2**9,
        "Owned": false,
    },
    "Precious": {
        "Chance": 2**10,
        "Owned": false,
    },
    "Crazy": {
        "Chance": 2**11,
        "Owned": false,
    },
    "_UNDERSCORE_": {
        "Chance": 2**12,
        "Owned": false,
    },
    "Undead": {
        "Chance": 2**13,
        "Owned": false,
    },
    "Mother": {
        "Chance": 2**14,
        "Owned": false,
    },
    "Undefined": {
        "Chance": 2**15,
        "Owned": false,
    },
    "Creepy...": {
        "Chance": 2**16,
        "Owned": false,
    },
    "Void": {
        "Chance": 2**17,
        "Owned": false,
    },
    "Star": {
        "Chance": 2**18,
        "Owned": false,
    },
    "Omega": {
        "Chance": 2**19,
        "Owned": false,
    },
    "SunScourage": {
        "Chance": 2**19,
        "Owned": false,
    },
};
var lastRollTime = 0;
var autoRollIntervalId;
//End var's, let's, const's

//Saving & Loading Data
function loadState() {
    var savedState = localStorage.getItem('auraState');
    if (savedState) {
        var savedDict = JSON.parse(savedState);
        for (var key in dict) {
            if (!savedDict.hasOwnProperty(key)) {
                savedDict[key] = dict[key];
            }
        }
        dict = savedDict;
        showIndex();
    }
}

function saveState() {
    var currentState = JSON.stringify(dict);
    localStorage.setItem('auraState', currentState);
}
//End Saving & Loading Data

//Functions

function Secret() {
    document.getElementById("auraText").innerHTML = '<h1 style="font-size: 24px;">' +"Secret 1/1T"+  '</h1>';
}

function toggleAutoRoll() {
    if (autoRollIntervalId) {
        stopAutoRoll();
    } else {
        startAutoRoll();
    }
}

function startAutoRoll() {
    autoRollIntervalId = setInterval(showAura, 500); // Call showAura every 1000 milliseconds (1 second)
}

function stopAutoRoll() {
    clearInterval(autoRollIntervalId);
    autoRollIntervalId = null;
}

function getRandomAura() {
    var currentTime = Date.now();
    if (currentTime - lastRollTime >= 100) {

        var a = Math.floor(Math.random() * 1000000) + 1;
        var selectedKey = "";
        var totalChance = 0;

        for (var key in dict) {
            if (dict.hasOwnProperty(key)) {
                totalChance += dict[key]["Chance"];
            }
        }

        var cumulativeProbability = 0;

        for (var key in dict) {
            if (dict.hasOwnProperty(key)) {
                var chance = dict[key]["Chance"];
                var adjustedChance = totalChance / chance;
                cumulativeProbability += adjustedChance / totalChance * 1000000;
                if (a <= cumulativeProbability) {
                    selectedKey = key;
                    if (!dict[key]["Owned"]) {
                        dict[key]["Owned"] = true;
                        showIndex();
                    }
                    break;
                }
            }
        }

        return '<h1 style="font-size: 24px;">' + selectedKey + ' 1/' + dict[selectedKey]["Chance"] + '</h1>';
    }
}

function getIndex() {
    var indexString = "";
    for (var key in dict) {
        if (dict.hasOwnProperty(key)) {
            var Owned = dict[key]["Owned"];
            var chance = dict[key]["Chance"];
            if (Owned === true) {
                indexString += key + ' 1/' + chance + '<br>';
            } else {
                indexString +='Locked<br>';
            }
        }
    }
    return indexString;
}

function showIndex() {
    var Index = getIndex();
    document.getElementById("indexText").innerHTML = Index;
}

function showAura() {
    var auraType = getRandomAura();
    if (auraType) {
        document.getElementById("auraText").innerHTML = auraType;
        saveState();
    }
}

window.onload = function() {
    loadState();
};

//End Functions
