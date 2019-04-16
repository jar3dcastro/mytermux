from random import randrange as r
def thirtyOne():
    #deciding who the hell starts
    play = input("Input 1 to jugar, anycosa else to safar de aqui.")
    while play=="1":
        counter = 0
        playsUser = True if r(2) == 1 else False #only r(2) is needed in fact
        print(("Player" if playsUser else "Computer")+" goes first!")
        #running game
        while counter < 31:
            numbers = 0
            if playsUser:
                numbers = input("Please input integer numbers between 1 to 3: ")
                while numbers not in ["1","2","3"]:
                    numbers = input("Goddammit. I said integer numbers between 1 to 3: ")
                numbers = int(numbers)
                print("your call is: ",end="")
            else:
                if counter < 27:
                    numbers = r(3) + 1
                elif counter < 30:
                    numbers = 30 - counter
                else:
                    numbers = 1
                print("computer calls: ",end="")
            # increasing counter
            print(' '.join([str(i) for i in range(counter+1,counter+1+numbers)]))
            counter += numbers
            # switching player
            playsUser = not playsUser
        print(("Player" if playsUser else "Computer")+" wins! :'v")
        play = input("Input 1 to jugar, anycosa else to safar de aqui.")
thirtyOne()
#[print(r(2)) for i in range(10)]
