THIS REPO IS NOW REDUNDANT.
A better version of this tool now exists in [ReMapper](https://github.com/Swifter1243/ReMapper)
It allows for better accuracy, any environment pieces, animations, and other objects/track representation.

# BlenderToEnvironment
This script is janky as fuck. nyri0 is developing a way better version right now.

This script only works in BTS. It duplicates the pillars and rescales them based off of blender transform info from ScuffedWalls.
The transform info comes in the form of notes, since its way easier to use them when they scale from the center.
DONT set the default pillars to false. If you want to get rid of them, yeet them out of render distance.
This script doesnt work with animations because that requires extra work which I havent done yet and it will just add to the jank. So wait for nyri0's or adapt this one if you want that.

You can add a whole lotta cubes, but I've found out (the hard way) that 2-2.5k is about the maximum you wanna have for smooth performance.

Guide on how to get everything working is in comments in the JS file. Feel free to adapt it to however you need it.

![image](https://user-images.githubusercontent.com/61858676/139190597-295bcd6e-dc62-4b4d-ae61-6c1bfcecdfc8.png)
![image](https://user-images.githubusercontent.com/61858676/139190669-97324420-15b6-4637-bd0d-d92be718fec8.png)
