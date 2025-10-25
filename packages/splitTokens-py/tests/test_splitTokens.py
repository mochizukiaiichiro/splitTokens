from pathlib import Path
import json
import pytest
from splitTokens import splitTokens

# テストデータファイルパス
TEST_DATA_PATH = Path(__file__).resolve().parents[3] / "common" / "test-fixtures"


def load_test_data(file_name: str):
    with open(TEST_DATA_PATH / file_name, encoding="utf-8") as f:
        return json.load(f)


# --- 正常系 ---
@pytest.mark.parametrize(
    "file_name", ["singleDefault.json", "oneLine.json", "multiLines.json", "misc.json"]
)
def test_splitTokens(file_name):
    data = load_test_data(file_name)

    for case in data:
        assert splitTokens(case["input"]) == case["output"]


# --- 異常系 ---
@pytest.mark.parametrize(
    "file_name",
    [
        "single.json",
    ],
)
def test_splitTokens_abnormality(file_name):
    data = load_test_data(file_name)

    for case in data:
        assert splitTokens(case["input"]) != case["output"]
