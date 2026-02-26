from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from collections import defaultdict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class NodeItem(BaseModel):
    id: str
    type: str | None = None
    data: dict | None = None


class EdgeItem(BaseModel):
    source: str
    target: str


class PipelineRequest(BaseModel):
    nodes: List[NodeItem]
    edges: List[EdgeItem]


def is_dag(nodes: List[NodeItem], edges: List[EdgeItem]) -> bool:
    adj = defaultdict(list)
    in_degree = defaultdict(int)
    node_ids = {n.id for n in nodes}

    for n_id in node_ids:
        in_degree[n_id] = 0

    for e in edges:
        adj[e.source].append(e.target)
        in_degree[e.target] += 1

    queue = [n for n in node_ids if in_degree[n] == 0]
    visited = 0

    while queue:
        node = queue.pop(0)
        visited += 1
        for neighbor in adj[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(node_ids)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineRequest):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag = is_dag(pipeline.nodes, pipeline.edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': dag,
    }
