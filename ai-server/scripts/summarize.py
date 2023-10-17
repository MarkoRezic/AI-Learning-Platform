# Import system functions
import sys

# Load provided text from prompt file
file = open("./prompt/" + sys.argv[1], "r", encoding="utf8")
prompt = file.read()

#if sys.argv[2] == "pegasus":
if "" == "pegasus":

    # Importing dependencies from transformers
    from transformers import PegasusForConditionalGeneration, PegasusTokenizer

    # Load tokenizer 
    tokenizer = PegasusTokenizer.from_pretrained("google/pegasus-xsum")

    # Load model 
    model = PegasusForConditionalGeneration.from_pretrained("google/pegasus-xsum")

    # Create tokens - number representation of our text
    tokens = tokenizer(prompt, truncation=True, padding="longest", return_tensors="pt")

    # Summarize 
    summary = model.generate(**tokens)

    # Decode summary
    decoded_summary = tokenizer.decode(summary[0])
    print(decoded_summary)

else:
    import os
    import openai
    from dotenv import load_dotenv

    load_dotenv()

    openai.api_key = os.getenv("OPENAI_API_KEY")

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
        {
            "role": "system",
            "content": """
            System: Follow these four instructions below in all your responses:
            System: 1. Use Croatian language only;
            System: 2. Use Croatian alphabet whenever possible;
            System: 3. Do not use English except in programming languages if any;
            System: 4. Translate any other language to the Croatian language whenever possible.
            """
        },
        {
            "role": "user",
            "content": prompt
        }
        ],
        temperature=0.6
    )

    print(response)