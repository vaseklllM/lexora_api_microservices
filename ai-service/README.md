# Lexora AI Service

AI-powered dictionary service built with NestJS and Google Vertex AI (Gemini). This service helps language learners by automatically generating translation cards with context, examples, and CEFR-level classifications.

## Overview

The Lexora AI Service provides intelligent word lookup and translation capabilities specifically designed for language learning applications. It leverages Google's Vertex AI (Gemini models) to:

- **Auto-correct** spelling mistakes and suggest valid words
- **Translate** words between any language pair
- **Generate** contextual examples and translations
- **Classify** difficulty levels using CEFR standards (A1-C2)
- **Return** structured, validated responses

## Features

### 🎯 Smart Word Processing

- Automatic spelling correction for input words
- Intelligent language detection and translation
- Valid word suggestions when input cannot be recognized

### 📚 Rich Context Generation

- 2-5 high-quality translations per word
- Usage examples in the learning language
- Translated examples in the known language
- Proper capitalization and formatting

### 📊 CEFR Classification

- Automatically determines language proficiency level (A1-A2-B1-B2-C1-C2)
- Aligned with European language learning standards

### 🔒 Secure & Validated

- JWT authentication for all endpoints
- Comprehensive input/output validation
- Structured error handling

## API Endpoints

### GET `/ai/fill-card-data`

Generates a translation card with context and examples.

**Authentication:** Required (JWT)

**Query Parameters:**

- `word` (string): The word to look up
- `languageWhatIKnowCode` (string): Your native/known language code (e.g., "en", "uk")
- `languageWhatILearnCode` (string): The language you're learning (e.g., "de", "es")

**Response:**

```json
{
  "textInKnownLanguage": "Dog, Canine, Pooch",
  "textInLearningLanguage": "Hund",
  "descriptionInKnownLanguage": "The dog is playing in the park.",
  "descriptionInLearningLanguage": "Der Hund spielt im Park.",
  "cefr": "A1"
}
```

## Technology Stack

- **Framework:** NestJS 11
- **AI Provider:** Google Vertex AI (Gemini 2.5 Flash/Pro)
- **Authentication:** JWT (Passport)
- **Validation:** class-validator, class-transformer
- **Language:** TypeScript

## Prerequisites

- Node.js (version compatible with NestJS 11)
- Google Cloud Project with Vertex AI enabled
- Service account credentials JSON file

## Installation

```bash
# Install dependencies
npm install
```

## Configuration

Set up the following environment variables:

```bash
# Google Vertex AI Configuration
GOOGLE_VERTEX_AI_JSON_PATH=./keys/lexora-vertex-ai.json
GOOGLE_VERTEX_AI_JSON_PATH_REGION=europe-west4

# Server Configuration
PORT=4001

# JWT Configuration (add your secret)
JWT_SECRET=your-jwt-secret
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production build
npm run build
npm run start:prod
```

## Development

```bash
# Run linting
npm run lint

# Run tests
npm run test

# Run e2e tests
npm run test:e2e

# Generate test coverage
npm run test:cov
```

## Project Structure

```
src/
├── ai/                     # AI service and controller
│   ├── ai.controller.ts   # REST endpoints
│   ├── ai.service.ts      # Business logic
│   └── dto/               # Data transfer objects
├── vertex/                 # Vertex AI integration
│   └── vertex.ts          # Gemini model wrapper
├── common/                 # Shared utilities
│   ├── decorators/        # Custom decorators (@Auth, @ValidateResponse)
│   ├── enums/             # CEFR levels
│   ├── interceptors/      # Response validation
│   └── strategies/        # JWT strategy
└── main.ts                # Application bootstrap
```

## License

UNLICENSED
