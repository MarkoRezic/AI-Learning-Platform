# Import system functions
import sys

# Importing dependencies from transformers
from transformers import PegasusForConditionalGeneration, PegasusTokenizer

# Load tokenizer 
tokenizer = PegasusTokenizer.from_pretrained("google/pegasus-xsum")

# Load model 
model = PegasusForConditionalGeneration.from_pretrained("google/pegasus-xsum")

text = sys.argv[1]

# Create tokens - number representation of our text
tokens = tokenizer(text, truncation=True, padding="longest", return_tensors="pt")

# Summarize 
summary = model.generate(**tokens)

# Decode summary
decoded_summary = tokenizer.decode(summary[0])
print(decoded_summary)