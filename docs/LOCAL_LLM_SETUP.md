# Local LLM Setup Guide

This guide explains how to set up a local LLM (Large Language Model) for AI-powered obituary generation in the FTLO app.

## Why Local LLM?

- **Privacy**: All data stays on your servers - crucial for sensitive funeral/memorial content
- **Cost Control**: No per-request API fees, only infrastructure costs
- **Customization**: Fine-tune models for obituary writing style
- **Offline Capability**: Works without internet connection

## Recommended Models

### For Obituary Generation (7B-13B models recommended)
1. **Llama 2 7B/13B** - Good general purpose, well-tested
2. **Mistral 7B** - Excellent performance for size
3. **Mixtral 8x7B** - Higher quality but requires more resources
4. **Vicuna 13B** - Fine-tuned for instruction following

## Setup Options

### Option 1: Ollama (Recommended for Development)

1. Install Ollama:
```bash
# macOS/Linux
curl -fsSL https://ollama.com/install.sh | sh

# Or download from https://ollama.com/download
```

2. Pull a model:
```bash
ollama pull llama2:7b
# or
ollama pull mistral:7b
```

3. Start Ollama (it runs automatically after install):
```bash
ollama serve
```

4. Set environment variables:
```bash
# .env.local
LLM_MODEL=llama2:7b
LLM_ENDPOINT=http://localhost:11434/api/generate
```

### Option 2: llama.cpp (For Production)

1. Clone and build llama.cpp:
```bash
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp
make
```

2. Download model weights (e.g., from Hugging Face)

3. Convert and quantize model:
```bash
python convert.py models/llama-2-7b-hf/
./quantize models/llama-2-7b-hf/ggml-model-f16.gguf models/llama-2-7b-q4_0.gguf q4_0
```

4. Run the server:
```bash
./server -m models/llama-2-7b-q4_0.gguf -c 2048
```

### Option 3: vLLM (For High-Performance Production)

1. Install vLLM:
```bash
pip install vllm
```

2. Run the server:
```bash
python -m vllm.entrypoints.openai.api_server \
    --model mistralai/Mistral-7B-Instruct-v0.2 \
    --port 8000
```

3. Update environment:
```bash
LLM_ENDPOINT=http://localhost:8000/v1/completions
```

## Fine-Tuning for Obituaries

To improve obituary quality, consider fine-tuning on funeral program data:

1. Prepare training data in JSONL format:
```json
{"prompt": "Write an obituary for...", "completion": "With heavy hearts..."}
```

2. Use tools like:
   - **LoRA** for efficient fine-tuning
   - **QLoRA** for memory-efficient training
   - **Axolotl** for easy fine-tuning setup

## Hardware Requirements

### Minimum (7B models):
- 16GB RAM
- GPU with 8GB VRAM (optional but recommended)
- 20GB disk space

### Recommended (13B models):
- 32GB RAM  
- GPU with 16GB VRAM
- 40GB disk space

### Production (Multiple concurrent requests):
- 64GB+ RAM
- Multiple GPUs or high-end GPU (A100, H100)
- NVMe SSD for model loading

## Testing the Integration

1. Check connection:
```bash
curl http://localhost:11434/api/tags
```

2. Test generation:
```bash
curl -X POST http://localhost:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama2:7b",
    "prompt": "Write a short, warm obituary for John Smith",
    "stream": false
  }'
```

3. In the app, the AI features will automatically use the local LLM when available.

## Monitoring & Optimization

1. Monitor memory usage:
```bash
# Check GPU memory
nvidia-smi

# Check system memory
htop
```

2. Optimize for production:
   - Use quantized models (4-bit or 8-bit)
   - Implement request queuing
   - Set up model caching
   - Use batch processing for multiple requests

## Security Considerations

1. **Network**: Keep LLM endpoint internal only
2. **Data**: Never log personal information
3. **Access**: Implement authentication for LLM endpoint
4. **Compliance**: Ensure HIPAA/privacy compliance

## Troubleshooting

### Out of Memory
- Use smaller model or quantization
- Reduce context length
- Enable GPU offloading

### Slow Generation
- Use GPU acceleration
- Try smaller model
- Optimize prompt length
- Consider vLLM for production

### Poor Quality
- Try different model (Mistral, Vicuna)
- Adjust temperature settings
- Fine-tune on obituary examples
- Improve prompt engineering