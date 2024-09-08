FROM python:3.11-slim

WORKDIR /app

# Instalar las dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código de la aplicación
COPY ./nlp_services .

# Exponer el puerto que usará FastAPI
EXPOSE 8001

# Comando para iniciar el servidor FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]