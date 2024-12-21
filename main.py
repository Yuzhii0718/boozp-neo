import os

from tools.configmanager import ConfigManager as cm
from tools.dbutils import DBUtils

db_info = cm.database()
db_utils = DBUtils()

def main():
    print("Select an option:")
    print("1. Run spider")
    print("2. Run data cleaner")
    print("3. Run web")
    print("init. Initialize database")

    choice = input("Enter your choice (1/2/3/init): ")

    if choice == '1':
        os.system('python ./spider/boss_selenium.py')
    elif choice == '2':
        os.system('python ./clean/dataclean.py')
    elif choice == '3':
        os.system('python ./web/runweb.py')
    elif choice == 'init':
        confirm = input("This operation will drop the old database and create a new one. Are you sure? (Y/n): ")
        if confirm.lower() == 'Y':
            db_utils.init_table()
        else:
            print("Initialization cancelled.")
    else:
        print("Invalid choice. Please enter 1, 2, or 3.")


if __name__ == '__main__':
    main()
