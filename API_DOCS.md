# API Documentation

## Authentication Endpoints

### Register User
**POST** `/api/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

**Response (201):**
```json
{
  "message": "Registration successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "subscription": "free"
  }
}
```

### Login User
**POST** `/api/auth/login`

Authenticate user and get JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "subscription": "free",
    "scansUsed": 3,
    "scansLimit": 5
  }
}
```

## Scans Endpoints

### Get All Scans
**GET** `/api/scans`

Get list of all scans for authenticated user.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "scans": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "target": "example.com",
      "targetType": "domain",
      "status": "completed",
      "riskScore": 72,
      "grade": "C",
      "threatLevel": "High",
      "vulnCount": 8,
      "openPorts": [80, 443, 22],
      "duration": 120,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### Create New Scan
**POST** `/api/scans`

Initiate a new security scan.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "target": "example.com",
  "targetType": "domain"
}
```

**Parameters:**
- `target` (string, required): URL, domain, or IP address
- `targetType` (enum, required): One of `url`, `domain`, `ip`

**Response (200):**
```json
{
  "message": "Scan completed",
  "scan": {
    "id": "507f1f77bcf86cd799439011",
    "target": "example.com",
    "riskScore": 72,
    "grade": "C",
    "threatLevel": "High",
    "vulnCount": 8,
    "duration": 120,
    "vulnerabilities": [
      {
        "id": "507f1f77bcf86cd799439012",
        "title": "Missing CSP Header",
        "severity": "Alto",
        "cvssScore": 7.2,
        "port": 443
      }
    ]
  }
}
```

**Error Responses:**
- `400`: Invalid target or target type
- `401`: Unauthorized (missing/invalid token)
- `403`: Scan limit reached
- `500`: Server error

## Vulnerability Structure

Each vulnerability contains:

```typescript
{
  id: string;                    // Unique identifier
  title: string;                 // Vulnerability name
  description: string;           // Detailed description
  type: string;                  // Category (e.g., "Security Header")
  severity: string;              // Critical, Alto, Medio, Bajo, Informativo
  cvssScore: number;             // 0.0 to 10.0
  port?: number;                 // Service port
  protocol?: string;             // Service protocol
  evidence: string;              // Technical evidence
  mitigation: string;            // Remediation steps
  cveIds: string[];              // Associated CVE identifiers
}
```

## Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 400 | Bad Request | Invalid input or missing required fields |
| 401 | Unauthorized | Missing or invalid authentication token |
| 403 | Forbidden | Resource access denied or limit exceeded |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource already exists (e.g., duplicate email) |
| 500 | Internal Server Error | Server error occurred |

## Rate Limiting

API calls are rate-limited based on subscription:

- **Free**: 5 scans/month
- **Pro**: Unlimited scans
- **Enterprise**: Custom limits

Current usage can be checked in user profile.

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer {token}
```

Tokens expire after 7 days (configurable via `JWT_EXPIRE`).

## Examples

### Using cURL

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePassword123!"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePassword123!"
  }'

# Get Scans
curl -X GET http://localhost:3000/api/scans \
  -H "Authorization: Bearer {token}"

# Create Scan
curl -X POST http://localhost:3000/api/scans \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "target": "example.com",
    "targetType": "domain"
  }'
```

### Using JavaScript/Fetch

```javascript
// Register
const registerResponse = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'SecurePassword123!'
  })
});
const registerData = await registerResponse.json();
const token = registerData.token;

// Get Scans
const scansResponse = await fetch('/api/scans', {
  headers: { 'Authorization': `Bearer ${token}` }
});
const scansData = await scansResponse.json();

// Create Scan
const scanResponse = await fetch('/api/scans', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    target: 'example.com',
    targetType: 'domain'
  })
});
const scanData = await scanResponse.json();
```

## Webhooks (Future)

Webhooks are planned for production version. Available events:
- `scan.completed`
- `scan.failed`
- `vulnerability.critical`

Subscribe via dashboard settings.
