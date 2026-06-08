from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Mini TMS API is running"}