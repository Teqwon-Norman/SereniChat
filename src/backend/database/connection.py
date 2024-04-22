import mysql.connector

# Database configuration
db_config = {
    'host': '35.232.11.20',
    'user': 'femi-user',
    'password': '123',
    'database': 'mental_health_orgs'
}


def test_connection():
    try:
        connection = mysql.connector.connect(**db_config)
        if connection.is_connected():
            db_info = connection.get_server_info()
            print(f'Connected to MySQL Server version {db_info}')
            # Test query to fetch server version
            cursor = connection.cursor()
            cursor.execute("SELECT VERSION()")
            version = cursor.fetchone()[0]
            print(f"Server version: {version}")
            cursor.close()
    except mysql.connector.Error as e:
        print(f'Error connecting to MySQL: {e}')
    finally:
        # Close connection when done
        if 'connection' in locals():
            connection.close()


# Test the connection
if __name__ == "__main__":
    test_connection()
