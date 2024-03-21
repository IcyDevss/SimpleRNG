var dict = {
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
};

// Load the saved state from localStorage
function loadState() {
    var savedState = localStorage.getItem('auraState');
    if (savedState) {
        dict = JSON.parse(savedState);
        showIndex(); // Update the index display after loading
    }
}

// Save the current state to localStorage
function saveState() {
    var currentState = JSON.stringify(dict);
    localStorage.setItem('auraState', currentState);
}

var lastRollTime = 0; // Variable to store the timestamp of the last roll

function getRandomAura() {
    var currentTime = Date.now();
    if (currentTime - lastRollTime >= 100) { // Check if it has been at least 1 second since the last roll
        lastRollTime = currentTime; // Update the last roll time
        
        // Perform the roll
        var a = Math.floor(Math.random() * 1000000) + 1;
        var selectedKey = "";
        var totalChance = 0;

        // Calculate the total chance for all aura types
        for (var key in dict) {
            if (dict.hasOwnProperty(key)) {
                totalChance += dict[key]["Chance"];
            }
        }

        // Determine the selected aura based on probability
        var cumulativeProbability = 0;
        for (var key in dict) {
            if (dict.hasOwnProperty(key)) {
                var chance = dict[key]["Chance"];
                // Adjust the probability inversely with rarity
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

        // Return the selected aura
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
    if (auraType) { // Check if a roll was performed
        document.getElementById("auraText").innerHTML = auraType;
        saveState(); // Save the state after selecting an aura
    }
}

// Call loadState() to load the saved state when the page loads
window.onload = function() {
    loadState();
};
