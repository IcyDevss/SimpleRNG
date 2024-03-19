import os
from random import randint
from colorama import Fore
import time
import json
import keyboard


class Handler:
    def __init__(self):
        self.data_file = os.path.join(os.path.expanduser('~'), 'data.json')
        self.chancedict = {
            "Common": {
                "Chance": 2,
                "Owned": False,
                "Color": Fore.CYAN
            },
            "Uncommon": {
                "Chance": 2**2,
                "Owned": False,
                "Color": Fore.LIGHTGREEN_EX
            },
            "Rare": {
                "Chance": 2**3,
                "Owned": False,
                "Color": Fore.BLUE
            },
            "Rage": {
                "Chance": 2**4,
                "Owned": False,
                "Color": Fore.RED
            },
            "Crystal": {
                "Chance": 2**5,
                "Owned": False,
                "Color": Fore.MAGENTA
            },
            "Ruby": {
                "Chance": 2**6,
                "Owned": False,
                "Color": Fore.LIGHTRED_EX
            },
            "Glitch": {
                "Chance": 2**7,
                "Owned": False,
                "Color": Fore.GREEN
            },
            "Hero": {
                "Chance": 2**8,
                "Owned": False,
                "Color": Fore.CYAN
            },
            "Love": {
                "Chance": 2**9,
                "Owned": False,
                "Color": Fore.RED
            },
            "Precious": {
                "Chance": 2**10,
                "Owned": False,
                "Color": Fore.CYAN
            },
            "Crazy": {
                "Chance": 2**11,
                "Owned": False,
                "Color": Fore.RED
            },
            "_UNDERSCORE_": {
                "Chance": 2**12,
                "Owned": False,
                "Color": Fore.BLUE
            },
            "Undead": {
                "Chance": 2**13,
                "Owned": False,
                "Color": Fore.GREEN
            },
            "Mother": {
                "Chance": 2**14,
                "Owned": False,
                "Color": Fore.MAGENTA
            },
        }
        self.infodb = False
        self.load_data()

    def save_data(self):
        with open(self.data_file, "w") as f:
            json.dump({rarity: {"Chance": values["Chance"], "Owned": values["Owned"]} for rarity, values in self.chancedict.items()}, f)

    def load_data(self):
        try:
            with open(self.data_file, "r") as f:
                loaded_data = json.load(f)
                for rarity, values in self.chancedict.items():
                    if rarity in loaded_data:
                        values["Owned"] = loaded_data[rarity]["Owned"]
        except FileNotFoundError:
            pass

    def roll(self):
        bt = False
        a = randint(1, 1_000_000)
        for rarity, chance in self.chancedict.items():
            b = 1_000_000 / chance["Chance"]
            if a >= b:
                if not chance["Owned"]:
                    chance["Owned"] = True
                    self.save_data()
                if chance["Chance"] > 100:
                    c = randint(1, 5)
                    if c == 3:
                        bt = True
                    print(chance["Color"] + "[INSERT STAR HERE]")
                    time.sleep(3)
                if bt == True:
                    print(f"{chance['Color'] + rarity} = 1/{chance['Chance']*5} BREAKTHROUGH")
                    bt = False
                else:
                    print(f"{chance['Color'] + rarity} = 1/{chance['Chance']}")
                time.sleep(0.5)
                break

    def index(self):
        if self.infodb == False:
            self.infodb = True
            print(Fore.WHITE + '----INDEX----')
            for rarity, values in self.chancedict.items():
                owned = values["Owned"]
                color = values["Color"]
                chance = values["Chance"]
                if owned == True:
                    print(f"{color + rarity} 1/{chance}")
                else:
                    print(Fore.WHITE + "LOCKED")
            print(Fore.WHITE + "-------")
            print("Continue, type 'roll', 'index' or 'reset'")
            time.sleep(0.5)
            self.infodb = False

    def reset(self):
        for _, values in self.chancedict.items():
            values["Owned"] = False
        self.save_data()
        print("Data Reset")
        print("Continue, type 'roll', 'index' or 'reset'")

    def auto(self):
        while True:
            self.roll()
            if keyboard.is_pressed("q"):
                print(Fore.WHITE + "Continue, type 'roll', 'index' or 'reset'")
                break
            time.sleep(0.1)


class Game:
    def __init__(self):
        self.rarity_handler = Handler()

    def run(self):
        print("Welcome!, type 'roll', 'index' or 'reset'")
        while True:
            inpt = input(Fore.WHITE)
            if inpt == "roll":
                self.rarity_handler.roll()
            elif inpt == "index":
                self.rarity_handler.index()
            elif inpt == "reset":
                self.rarity_handler.reset()
            elif inpt == "auto":
                self.rarity_handler.auto()
            else:
                print("Invalid Input, type 'roll', 'index' or 'reset'")


if __name__ == "__main__":
    game = Game()
    game.run()