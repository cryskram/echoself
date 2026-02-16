import pandas as pd
import requests

GRAPHQL_ENDPOINT = "http://localhost:3000/api/graphql"

QUERY = """
mutation CreateUser($regId: String!, $name: String!) {
  createUser(regId: $regId, name: $name) {
    regId
  }
}
"""


def main():
    df = pd.read_excel("", dtype={"Unique ID": str})  # later for file name

    success = 0
    failed = 0

    for _, row in df.iterrows():
        regid = str(row["Unique ID"]).strip()
        name = str(row["Full Name"]).strip()

        if not regid or not name:
            continue

        res = requests.post(
            GRAPHQL_ENDPOINT,
            json={
                "query": QUERY,
                "variables": {
                    "regId": regid,
                    "name": name,
                },
            },
            timeout=10,
        )

        print("->", regid, "|", res.text)

        if res.status_code == 200 and "errors" not in res.json():
            success += 1
        else:
            failed += 1

    print(f"Imported: {success}")
    print(f"Failed: {failed}")


if __name__ == "__main__":
    main()
