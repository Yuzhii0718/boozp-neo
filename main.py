import os

def main():
    print("Select an option:")
    print("1. Run spider")
    print("2. Run data cleaner")
    print("3. Run web")

    choice = input("Enter your choice (1/2/3): ")

    if choice == '1':
        os.system('python ./spider/boss_selenium.py')
    elif choice == '2':
        os.system('python ./clean/dataclean.py')
    elif choice == '3':
        os.system('python ./web/runweb.py')
    else:
        print("Invalid choice. Please enter 1, 2, or 3.")

if __name__ == '__main__':
    main()