FROM node:latest

# Set working directory
WORKDIR /app

# Copy only package.json and pnpm-lock.yaml first (for better caching)
COPY package*.json ./

# Install dependencies (this will use pnpm to install dependencies)
RUN npm install -g pnpm@latest && pnpm install

# Copy the rest of the application code
COPY . .

# Expose the development server port
EXPOSE 3000

# Use pnpm dev to start the development server
CMD ["pnpm", "dev"]
