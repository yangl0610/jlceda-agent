import pytest
from src.agent.parser import ReActParser, AgentAction, FinalAnswer


@pytest.fixture
def parser():
    return ReActParser()


def test_parse_action(parser):
    text = 'Thought: 我需要获取原理图\nAction: {"tool": "get_schematic_info", "params": {}}'
    result = parser.parse(text)
    assert isinstance(result, AgentAction)
    assert result.tool == "get_schematic_info"
    assert result.params == {}


def test_parse_final_answer(parser):
    text = "Thought: 任务完成\nFinal Answer: 原理图中共有 10 个元件。"
    result = parser.parse(text)
    assert isinstance(result, FinalAnswer)
    assert "10 个元件" in result.text


def test_parse_action_with_params(parser):
    text = 'Thought: 搜索元件\nAction: {"tool": "search_component", "params": {"keyword": "STM32"}}'
    result = parser.parse(text)
    assert isinstance(result, AgentAction)
    assert result.params["keyword"] == "STM32"


def test_parse_fallback(parser):
    text = "这是一段没有格式的回复"
    result = parser.parse(text)
    assert isinstance(result, FinalAnswer)
