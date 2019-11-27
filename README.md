# actions-get-tfoutput

GitHub Actions that fetch output value from tfstate saved on AWS S3

## Usage

Before using action, ensure AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY added to environments.

```yaml
jobs:
  generate_service_json:
    runs-on: ubuntu-latest
    env:
      AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
      AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    steps:
      - uses: loilo-inc/actions-get-tfoutput@v1.0.0
        with:
          bucket: "loilo-terraform"
          key: "development/terraform.tfstate"
          output-name: "service"
          output-file: "./service.json"
```