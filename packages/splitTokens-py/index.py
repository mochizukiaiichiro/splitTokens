import sys
from src.splitTokens import splitTokens


# main関数
def main():
    tokens = splitTokens(sys.stdin.read())
    print(tokens)


# エントリーポイント
if __name__ == "__main__":
    main()
