window.WORLDSTATE = {
  "name": "WorldState",
  "subtitle": "Scalable Implicit Memory for Interactive Video World Models",
  "paperUrl": "",
  "codeUrl": "",
  "bibtex": "",
  "authors": "",
  "affiliation": "",
  "featuredVideo": {
    "src": "assets/worldstate-overview.mp4",
    "poster": "assets/worldstate-overview.jpg",
    "title": "WorldState in motion"
  },
  "abstract": "Interactive video world models generate continuous video streams conditioned on user actions and camera movements. Long-horizon interaction requires these models to preserve previously generated environments and recover historically consistent content during spatial revisits. Explicit memories either require growing storage and retrieval or rely on potentially inaccurate geometric estimates. Recurrent linear memory avoids these costs but suffers from imbalanced frame-wise updates and fixed capacity: spatial normalization weakens erasure relative to writing, while a single state cannot scale with video length, forcing a growing amount of historical information to compete for limited memory capacity. To address these limitations, we propose WorldState, a scalable implicit memory model built upon a hybrid attention backbone. WorldState decouples memory erasing and writing for fine-grained memory editing and uniformly organizes history into a logarithmically growing set of temporally isolated states. Completed historical states remain subject to channel-wise decay but are excluded from subsequent erasure and writing, reducing repeated overwriting while preserving adaptive forgetting. Context-aware memory routing further retrieves relevant historical states according to the current generation context. Extensive experiments demonstrate that WorldState substantially improves long-term memory retention and spatial revisit consistency while preserving the computational efficiency of linear attention, enabling high-fidelity and spatially coherent video generation over extended interaction horizons.",
  "steps": [
    {
      "title": "Edit with precision.",
      "label": "Edit associations",
      "text": "Separate erase and write gates control what to remove and what to add. Channel-wise decay gives different memory channels their own retention timescales.",
      "note": "Independent erase · write · retention",
      "formula": "Sₜ = Sₜ₋₁ Mₜ + Uₜ"
    },
    {
      "title": "Give history its own space.",
      "label": "Preserve across time",
      "text": "Distribute latent frames uniformly across a logarithmically growing set of temporal states. The live state receives decay, erasure, and writes; completed states retain channel-wise decay while remaining protected from later erasure and writing.",
      "note": "Uniform spans · separate states",
      "formula": "N = ⌈log₂ T⌉"
    },
    {
      "title": "Recall what matters now.",
      "label": "Retrieve by context",
      "text": "The current query predicts positive, per-head weights over historical states. Readout combines routed history with the live state. Routing controls retrieval independently of recurrent memory editing.",
      "note": "Query-conditioned · per-head routing",
      "formula": "Oₜ = (Sˡⁱᵛᵉ + Σᵢ rᵢ Sⁱ) Qₜ"
    }
  ],
  "comparisonModels": [
    {
      "id": "firstvisit",
      "name": "First Visit"
    },
    {
      "id": "gen3c",
      "name": "Gen3C"
    },
    {
      "id": "spatia",
      "name": "Spatia"
    },
    {
      "id": "mxg3",
      "name": "Matrix-Game 3.0"
    },
    {
      "id": "sanawm",
      "name": "SANA-WM"
    },
    {
      "id": "worldstate",
      "name": "WorldState"
    }
  ],
  "comparisonRows": [
    {
      "id": "outdoor_09-a",
      "title": "Outdoor 09",
      "prompt": "",
      "videos": {
        "firstvisit": {
          "image": "assets/first-visit/outdoor_09-a.png"
        },
        "gen3c": {
          "src": "assets/previews-v2/row-01-gen3c.mp4",
          "poster": "assets/videos/comparisons-20260922-top/outdoor_09-a-gen3c.jpg"
        },
        "spatia": {
          "src": "assets/previews-v2/row-01-spatia.mp4",
          "poster": "assets/videos/comparisons-20260922-top/outdoor_09-a-spatia.jpg"
        },
        "mxg3": {
          "src": "assets/previews-v2/row-01-mxg3.mp4",
          "poster": "assets/videos/comparisons-20260922-top/outdoor_09-a-mxg3.jpg"
        },
        "sanawm": {
          "src": "assets/previews-v2/row-01-model-04.mp4",
          "poster": "assets/videos/comparisons-20260922-top/outdoor_09-a-model-04.jpg"
        },
        "worldstate": {
          "src": "assets/previews-v2/row-01-worldstate.mp4",
          "poster": "assets/videos/comparisons-20260922-top/outdoor_09-a-worldstate.jpg"
        }
      },
      "group": "Static-Scene Exploration",
      "duration": 22.0625
    },
    {
      "id": "indoor_01-c",
      "title": "Indoor 01",
      "prompt": "",
      "videos": {
        "firstvisit": {
          "image": "assets/first-visit/indoor_01-c.png"
        },
        "gen3c": {
          "src": "assets/previews-v2/row-02-gen3c.mp4",
          "poster": "assets/presentation-v1/clip-001.jpg"
        },
        "spatia": {
          "src": "assets/previews-v2/row-02-spatia.mp4",
          "poster": "assets/presentation-v1/clip-002.jpg"
        },
        "mxg3": {
          "src": "assets/previews-v2/row-02-mxg3.mp4",
          "poster": "assets/presentation-v1/clip-003.jpg"
        },
        "sanawm": {
          "src": "assets/previews-v2/row-02-model-04.mp4",
          "poster": "assets/presentation-v1/clip-004.jpg"
        },
        "worldstate": {
          "src": "assets/previews-v2/row-02-worldstate.mp4",
          "poster": "assets/presentation-v1/clip-005.jpg"
        }
      },
      "group": "Static-Scene Exploration",
      "duration": 14.468506
    },
    {
      "id": "indoor_02-g",
      "title": "Indoor 02",
      "prompt": "",
      "videos": {
        "firstvisit": {
          "image": "assets/first-visit/indoor_02-g.png"
        },
        "gen3c": {
          "src": "assets/previews-v2/row-03-gen3c.mp4",
          "poster": "assets/presentation-v1/clip-006.jpg"
        },
        "spatia": {
          "src": "assets/previews-v2/row-03-spatia.mp4",
          "poster": "assets/presentation-v1/clip-007.jpg"
        },
        "mxg3": {
          "src": "assets/previews-v2/row-03-mxg3.mp4",
          "poster": "assets/presentation-v1/clip-008.jpg"
        },
        "sanawm": {
          "src": "assets/previews-v2/row-03-model-04.mp4",
          "poster": "assets/presentation-v1/clip-009.jpg"
        },
        "worldstate": {
          "src": "assets/previews-v2/row-03-worldstate.mp4",
          "poster": "assets/presentation-v1/clip-010.jpg"
        }
      },
      "group": "Static-Scene Exploration",
      "duration": 14.96875
    },
    {
      "id": "indoor_05-b",
      "title": "Indoor 05 · 30s",
      "prompt": "",
      "videos": {
        "firstvisit": {
          "image": "assets/first-visit/indoor_05-b.png"
        },
        "gen3c": {
          "src": "assets/previews-v2/row-04-gen3c.mp4",
          "poster": "assets/comparison-previews-trim2/row-11-gen3c.jpg"
        },
        "spatia": {
          "src": "assets/previews-v2/row-04-spatia.mp4",
          "poster": "assets/comparison-previews-trim2/row-11-spatia.jpg"
        },
        "mxg3": {
          "src": "assets/previews-v2/row-04-mxg3.mp4",
          "poster": "assets/comparison-previews-trim2/row-11-mxg3.jpg"
        },
        "sanawm": {
          "src": "assets/previews-v2/row-04-model-04.mp4",
          "poster": "assets/comparison-previews-trim2/row-11-model-04.jpg"
        },
        "worldstate": {
          "src": "assets/previews-v2/row-04-worldstate.mp4",
          "poster": "assets/comparison-previews-trim2/row-11-worldstate.jpg"
        }
      },
      "group": "Static-Scene Exploration",
      "duration": 29.9375
    },
    {
      "id": "outdoor_16-b",
      "title": "Outdoor 16 · 30s",
      "prompt": "",
      "videos": {
        "firstvisit": {
          "image": "assets/first-visit/outdoor_16-b.png"
        },
        "gen3c": {
          "src": "assets/previews-v2/row-05-gen3c.mp4",
          "poster": "assets/comparison-previews-trim2/row-12-gen3c.jpg"
        },
        "spatia": {
          "src": "assets/previews-v2/row-05-spatia.mp4",
          "poster": "assets/comparison-previews-trim2/row-12-spatia.jpg"
        },
        "mxg3": {
          "src": "assets/previews-v2/row-05-mxg3.mp4",
          "poster": "assets/comparison-previews-trim2/row-12-mxg3.jpg"
        },
        "sanawm": {
          "src": "assets/previews-v2/row-05-model-04.mp4",
          "poster": "assets/comparison-previews-trim2/row-12-model-04.jpg"
        },
        "worldstate": {
          "src": "assets/previews-v2/row-05-worldstate.mp4",
          "poster": "assets/comparison-previews-trim2/row-12-worldstate.jpg"
        }
      },
      "group": "Static-Scene Exploration",
      "duration": 29.9375
    },
    {
      "id": "outdoor_12-g",
      "title": "Outdoor 12 · 30s",
      "prompt": "",
      "videos": {
        "firstvisit": {
          "image": "assets/first-visit/outdoor_12-g.png"
        },
        "gen3c": {
          "src": "assets/previews-v2/row-06-gen3c.mp4",
          "poster": "assets/comparison-previews-trim2/row-13-gen3c.jpg"
        },
        "spatia": {
          "src": "assets/previews-v2/row-06-spatia.mp4",
          "poster": "assets/comparison-previews-trim2/row-13-spatia.jpg"
        },
        "mxg3": {
          "src": "assets/previews-v2/row-06-mxg3.mp4",
          "poster": "assets/comparison-previews-trim2/row-13-mxg3.jpg"
        },
        "sanawm": {
          "src": "assets/previews-v2/row-06-model-04.mp4",
          "poster": "assets/comparison-previews-trim2/row-13-model-04.jpg"
        },
        "worldstate": {
          "src": "assets/previews-v2/row-06-worldstate.mp4",
          "poster": "assets/comparison-previews-trim2/row-13-worldstate.jpg"
        }
      },
      "group": "Static-Scene Exploration",
      "duration": 29.9375
    },
    {
      "id": "outdoor_11-h",
      "title": "Outdoor 11 · 29s",
      "prompt": "",
      "videos": {
        "firstvisit": {
          "image": "assets/first-visit/outdoor_11-h.png"
        },
        "gen3c": {
          "src": "assets/previews-v2/row-07-gen3c.mp4",
          "poster": "assets/comparison-previews-trim2/row-14-gen3c.jpg"
        },
        "spatia": {
          "src": "assets/previews-v2/row-07-spatia.mp4",
          "poster": "assets/comparison-previews-trim2/row-14-spatia.jpg"
        },
        "mxg3": {
          "src": "assets/previews-v2/row-07-mxg3.mp4",
          "poster": "assets/comparison-previews-trim2/row-14-mxg3.jpg"
        },
        "sanawm": {
          "src": "assets/previews-v2/row-07-model-04.mp4",
          "poster": "assets/comparison-previews-trim2/row-14-model-04.jpg"
        },
        "worldstate": {
          "src": "assets/previews-v2/row-07-worldstate.mp4",
          "poster": "assets/comparison-previews-trim2/row-14-worldstate.jpg"
        }
      },
      "group": "Static-Scene Exploration",
      "duration": 28.937012
    },
    {
      "id": "indoor_14-j",
      "title": "Indoor 14",
      "prompt": "",
      "videos": {
        "firstvisit": {
          "image": "assets/first-visit/indoor_14-j.png"
        },
        "gen3c": {
          "src": "assets/previews-v2/row-08-gen3c.mp4",
          "poster": "assets/comparison-previews-trim2/row-04-gen3c.jpg"
        },
        "spatia": {
          "src": "assets/previews-v2/row-08-spatia.mp4",
          "poster": "assets/comparison-previews-trim2/row-04-spatia.jpg"
        },
        "mxg3": {
          "src": "assets/previews-v2/row-08-mxg3.mp4",
          "poster": "assets/comparison-previews-trim2/row-04-mxg3.jpg"
        },
        "sanawm": {
          "src": "assets/previews-v2/row-08-model-04.mp4",
          "poster": "assets/comparison-previews-trim2/row-04-model-04.jpg"
        },
        "worldstate": {
          "src": "assets/previews-v2/row-08-worldstate.mp4",
          "poster": "assets/comparison-previews-trim2/row-04-worldstate.jpg"
        }
      },
      "group": "Static-Scene Exploration",
      "duration": 32.937012
    },
    {
      "id": "glacial-lake-j",
      "title": "Glacial Lake · 33s",
      "prompt": "A sculptural blue iceberg with a natural arch in a turquoise glacial lake, smaller floating ice, rugged snowy mountains and delicate water ripples in cold daylight. Move steadily forward for sixteen seconds while gently looking to either side by about twenty-two degrees, following the supplied camera path. Hold both position and viewing direction completely still for one second. Retrace the exact path backward over sixteen seconds, reversing the earlier viewing directions to return to the original position and orientation. Smooth continuous motion, stable horizon, no cuts, coherent scene geometry.",
      "videos": {
        "firstvisit": {
          "image": "assets/first-visit/glacial-lake-j.png"
        },
        "gen3c": {
          "src": "assets/previews-v2/row-09-gen3c.mp4",
          "poster": "assets/comparison-previews-trim2/row-05-gen3c.jpg"
        },
        "spatia": {
          "src": "assets/previews-v2/row-09-spatia.mp4",
          "poster": "assets/comparison-previews-trim2/row-05-spatia.jpg"
        },
        "mxg3": {
          "src": "assets/previews-v2/row-09-mxg3.mp4",
          "poster": "assets/comparison-previews-trim2/row-05-mxg3.jpg"
        },
        "sanawm": {
          "src": "assets/previews-v2/row-09-model-04.mp4",
          "poster": "assets/comparison-previews-trim2/row-05-model-04.jpg"
        },
        "worldstate": {
          "src": "assets/previews-v2/row-09-worldstate.mp4",
          "poster": "assets/comparison-previews-trim2/row-05-worldstate.jpg"
        }
      },
      "group": "Dynamic-Scene Exploration",
      "duration": 32.937012
    },
    {
      "id": "seaside-c",
      "title": "Seaside · 29s",
      "prompt": "A sandy coastline curving beneath rocky headlands, blue-green breaking waves, scattered wet shore rocks, coastal grasses and warm afternoon sunlight. Move backward, then advance past the starting point. Glance left thirty degrees during retreat and right thirty degrees near the forward destination. Hold completely still for one second, then return to the starting position and viewing direction. Keep a level horizon, smooth starts and stops, stable scene geometry, and one continuous shot.",
      "videos": {
        "firstvisit": {
          "image": "assets/first-visit/seaside-c.png"
        },
        "gen3c": {
          "src": "assets/previews-v2/row-10-gen3c.mp4",
          "poster": "assets/comparison-previews-trim2/row-07-gen3c.jpg"
        },
        "spatia": {
          "src": "assets/previews-v2/row-10-spatia.mp4",
          "poster": "assets/comparison-previews-trim2/row-07-spatia.jpg"
        },
        "mxg3": {
          "src": "assets/previews-v2/row-10-mxg3.mp4",
          "poster": "assets/comparison-previews-trim2/row-07-mxg3.jpg"
        },
        "sanawm": {
          "src": "assets/previews-v2/row-10-model-04.mp4",
          "poster": "assets/comparison-previews-trim2/row-07-model-04.jpg"
        },
        "worldstate": {
          "src": "assets/previews-v2/row-10-worldstate.mp4",
          "poster": "assets/comparison-previews-trim2/row-07-worldstate.jpg"
        }
      },
      "group": "Dynamic-Scene Exploration",
      "duration": 28.9375
    },
    {
      "id": "waterfall-f",
      "title": "Waterfall · 35s",
      "prompt": "",
      "videos": {
        "firstvisit": {
          "image": "assets/first-visit/waterfall-f.png"
        },
        "gen3c": {
          "src": "assets/previews-v2/row-11-gen3c.mp4",
          "poster": "assets/comparison-previews-trim2/row-08-gen3c.jpg"
        },
        "spatia": {
          "src": "assets/previews-v2/row-11-spatia.mp4",
          "poster": "assets/comparison-previews-trim2/row-08-spatia.jpg"
        },
        "mxg3": {
          "src": "assets/previews-v2/row-11-mxg3.mp4",
          "poster": "assets/comparison-previews-trim2/row-08-mxg3.jpg"
        },
        "sanawm": {
          "src": "assets/previews-v2/row-11-model-04.mp4",
          "poster": "assets/comparison-previews-trim2/row-08-model-04.jpg"
        },
        "worldstate": {
          "src": "assets/previews-v2/row-11-worldstate.mp4",
          "poster": "assets/comparison-previews-trim2/row-08-worldstate.jpg"
        }
      },
      "group": "Dynamic-Scene Exploration",
      "duration": 34.9375
    },
    {
      "id": "autumn-stream-j",
      "title": "Autumn Stream · 33s",
      "prompt": "",
      "videos": {
        "firstvisit": {
          "image": "assets/first-visit/autumn-stream-j.png"
        },
        "gen3c": {
          "src": "assets/previews-v2/row-12-gen3c.mp4",
          "poster": "assets/comparison-previews-trim2/row-09-gen3c.jpg"
        },
        "spatia": {
          "src": "assets/previews-v2/row-12-spatia.mp4",
          "poster": "assets/comparison-previews-trim2/row-09-spatia.jpg"
        },
        "mxg3": {
          "src": "assets/previews-v2/row-12-mxg3.mp4",
          "poster": "assets/comparison-previews-trim2/row-09-mxg3.jpg"
        },
        "sanawm": {
          "src": "assets/previews-v2/row-12-model-04.mp4",
          "poster": "assets/comparison-previews-trim2/row-09-model-04.jpg"
        },
        "worldstate": {
          "src": "assets/previews-v2/row-12-worldstate.mp4",
          "poster": "assets/comparison-previews-trim2/row-09-worldstate.jpg"
        }
      },
      "group": "Dynamic-Scene Exploration",
      "duration": 32.937012
    },
    {
      "id": "seaside-f",
      "title": "Seaside · 35s",
      "prompt": "",
      "videos": {
        "firstvisit": {
          "image": "assets/first-visit/seaside-f.png"
        },
        "gen3c": {
          "src": "assets/previews-v2/row-13-gen3c.mp4",
          "poster": "assets/comparison-previews-trim2/row-10-gen3c.jpg"
        },
        "spatia": {
          "src": "assets/previews-v2/row-13-spatia.mp4",
          "poster": "assets/comparison-previews-trim2/row-10-spatia.jpg"
        },
        "mxg3": {
          "src": "assets/previews-v2/row-13-mxg3.mp4",
          "poster": "assets/comparison-previews-trim2/row-10-mxg3.jpg"
        },
        "sanawm": {
          "src": "assets/previews-v2/row-13-model-04.mp4",
          "poster": "assets/comparison-previews-trim2/row-10-model-04.jpg"
        },
        "worldstate": {
          "src": "assets/previews-v2/row-13-worldstate.mp4",
          "poster": "assets/comparison-previews-trim2/row-10-worldstate.jpg"
        }
      },
      "group": "Dynamic-Scene Exploration",
      "duration": 34.9375
    }
  ],
  "shortVideos": [
    {
      "id": "sea-arch-h",
      "title": "Sea Arch",
      "src": "assets/previews-v2/gallery-01.mp4",
      "poster": "assets/presentation-v1/clip-011.jpg",
      "prompt": ""
    },
    {
      "id": "volcanic-coast-c",
      "title": "Volcanic Coast",
      "src": "assets/previews-v2/gallery-02.mp4",
      "poster": "assets/presentation-v1/clip-012.jpg",
      "prompt": ""
    },
    {
      "id": "villa-courtyard-360",
      "title": "Villa Courtyard",
      "src": "assets/previews-v2/gallery-12.mp4",
      "poster": "assets/world-generation/villa-courtyard-360.jpg",
      "prompt": ""
    },
    {
      "id": "outdoor17-e",
      "title": "Outdoor 17",
      "src": "assets/previews-v2/gallery-04.mp4",
      "poster": "assets/presentation-v1/clip-014.jpg",
      "prompt": ""
    },
    {
      "id": "indoor20-b",
      "title": "Indoor 20",
      "src": "assets/previews-v2/gallery-05.mp4",
      "poster": "assets/presentation-v1/clip-015.jpg",
      "prompt": ""
    },
    {
      "id": "indoor18-b",
      "title": "Indoor 18",
      "src": "assets/previews-v2/gallery-06.mp4",
      "poster": "assets/presentation-v1/clip-016.jpg",
      "prompt": ""
    },
    {
      "id": "black-sand-coast-e",
      "title": "Black Sand Coast · E",
      "src": "assets/previews-v2/gallery-18.mp4",
      "poster": "assets/world-generation/black-sand-coast-e.jpg",
      "prompt": ""
    },
    {
      "id": "deer",
      "title": "Deer",
      "src": "assets/previews-v2/gallery-08.mp4",
      "poster": "assets/presentation-v1/clip-018.jpg",
      "prompt": ""
    },
    {
      "id": "outdoor04-g",
      "title": "Outdoor 04 · G",
      "src": "assets/previews-v2/gallery-09.mp4",
      "poster": "assets/presentation-v1/clip-019-trim2.jpg",
      "prompt": ""
    },
    {
      "id": "desert-poplar-k",
      "title": "Desert Poplar · K",
      "src": "assets/previews-v2/gallery-20.mp4",
      "poster": "assets/world-generation/desert-poplar-k.jpg",
      "prompt": ""
    },
    {
      "id": "indoor11-c",
      "title": "Indoor 11 · C",
      "src": "assets/previews-v2/gallery-11.mp4",
      "poster": "assets/presentation-v1/clip-021-trim2.jpg",
      "prompt": ""
    },
    {
      "id": "autumn-stream-b",
      "title": "Autumn Stream",
      "src": "assets/previews-v2/autumn-stream-v2.mp4",
      "poster": "assets/world-generation/autumn-stream-v2.jpg",
      "prompt": ""
    },
    {
      "id": "seaside-chapel",
      "title": "Seaside Chapel",
      "src": "assets/previews-v2/gallery-13.mp4",
      "poster": "assets/world-generation/seaside-chapel.jpg",
      "prompt": ""
    },
    {
      "id": "underwater-library-c",
      "title": "Underwater Library · C",
      "src": "assets/previews-v2/gallery-14.mp4",
      "poster": "assets/world-generation/underwater-library-c.jpg",
      "prompt": ""
    },
    {
      "id": "stream-teahouse",
      "title": "Stream Teahouse",
      "src": "assets/previews-v2/stream-teahouse-v2.mp4",
      "poster": "assets/world-generation/stream-teahouse-v2.jpg",
      "prompt": ""
    },
    {
      "id": "desert-bunker-f",
      "title": "Desert Bunker · F",
      "src": "assets/previews-v2/gallery-16.mp4",
      "poster": "assets/world-generation/desert-bunker-f.jpg",
      "prompt": ""
    },
    {
      "id": "stream-teahouse-10",
      "title": "Stream Teahouse · 10",
      "src": "assets/previews-v2/stream-teahouse-10.mp4",
      "poster": "assets/world-generation/stream-teahouse-10.jpg",
      "prompt": ""
    },
    {
      "id": "zebras",
      "title": "Zebras",
      "src": "assets/previews-v2/gallery-07.mp4",
      "poster": "assets/presentation-v1/clip-017.jpg",
      "prompt": ""
    },
    {
      "id": "outdoor18-j",
      "title": "Outdoor 18 · J",
      "src": "assets/previews-v2/gallery-10.mp4",
      "poster": "assets/presentation-v1/clip-020-trim2.jpg",
      "prompt": ""
    },
    {
      "id": "alpine-lake-k",
      "title": "Alpine Lake · K",
      "src": "assets/previews-v2/gallery-21.mp4",
      "poster": "assets/world-generation/alpine-lake-k.jpg",
      "prompt": ""
    }
  ],
  "longVideos": [],
  "architecture": {
    "src": "assets/framework-with-scene-memory.png?v=dfe431c0c09d",
    "width": 3600,
    "height": 1460,
    "title": "Overview of WorldState architecture.",
    "parts": [
      {
        "lead": "(a) Scalable memory organization and routing:",
        "text": "History is uniformly partitioned into logarithmically growing temporal states, with context-aware routing for memory retrieval."
      },
      {
        "lead": "(b) Decoupled memory editing:",
        "text": "Independent erase and write gates with channel-wise decay enable fine-grained recurrent memory updates."
      }
    ]
  },
  "videos": [
    {
      "id": "coast",
      "title": "Jungle Ruins",
      "category": "Exploration",
      "tag": "Jungle ruins · Game style · Hard trajectory",
      "poster": "assets/game_style_008_poster.jpg",
      "src": "assets/previews-v2/long-01.mp4",
      "description": "A first-person view through a rain-drenched jungle ruin.",
      "prompt": "A first-person view of a rain-drenched jungle ruin where moss-covered stone pillars and crumbling masonry frame a muddy path leading toward distant, mist-shrouded hills. The ground is slick with water, reflecting the overcast sky, while thick vines and leafy undergrowth cling to the weathered architecture. Raindrops streak vertically through the air, visible against the dark, wet surfaces of the stone and foliage. In the immediate foreground, the tops of worn leather boots rest on the damp earth, anchoring the perspective. The scene is defined by the textures of decaying stone, vibrant green moss, and the heavy, humid atmosphere of a forgotten, overgrown sanctuary."
    },
    {
      "id": "harbor",
      "title": "Futuristic City",
      "category": "Long horizon",
      "tag": "Game style · Hard trajectory",
      "poster": "assets/game_style_005_poster.jpg",
      "src": "assets/previews-v2/long-06.mp4",
      "description": "Game-style world exploration along a hard camera trajectory.",
      "prompt": "A first-person view from a cracked concrete rooftop overlooks a futuristic city skyline shrouded in low-lying mist under a gradient twilight sky. The foreground features a weathered, gray surface with visible fissures and a metal railing running horizontally across the frame. In the distance, illuminated skyscrapers pierce through the haze, displaying neon accents in purple and green, while one building glows warmly from internal lighting. A small aircraft hovers silently against the dusky horizon, adding subtle motion to the otherwise still urban panorama. The atmosphere is calm and atmospheric, with soft ambient light casting gentle shadows across the scene."
    }
  ],
  "refinerComparisons": []
};
