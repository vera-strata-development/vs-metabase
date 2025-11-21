# VSDatabase

VSDatabase es una plataforma de análisis de datos y business intelligence diseñada para facilitar la visualización, exploración y análisis de información empresarial.

![VSDatabase](https://www.verastrata.com)

## Características principales

- **Interfaz intuitiva**: Permite a cualquier persona en tu equipo hacer preguntas y explorar datos sin necesidad de conocer SQL
- **Editor SQL**: Para consultas más complejas y análisis avanzados
- **Dashboards interactivos**: Crea paneles visuales con filtros, actualización automática y comportamiento personalizado
- **Modelos de datos**: Define modelos que limpian, anotan y combinan tablas para facilitar su uso
- **Exportación PDF personalizable**: Exporta dashboards con tu logo personalizado
- **Alertas y notificaciones**: Configura alertas para recibir notificaciones cuando tus datos cambien
- **Múltiples bases de datos**: Conecta con PostgreSQL, MySQL, MongoDB, BigQuery, Snowflake y muchas más

## Instalación con Docker

La forma más sencilla de ejecutar VSDatabase es con Docker:

```bash
# Descargar y ejecutar la última versión
docker pull vsmanuel/vsdatabase:latest

# Ejecutar con base de datos H2 embebida (para pruebas)
docker run -d -p 3000:3000 --name vsdatabase vsmanuel/vsdatabase:latest

# Ejecutar con base de datos externa (recomendado para producción)
docker run -d -p 3000:3000 \
  -e MB_DB_TYPE=postgres \
  -e MB_DB_DBNAME=vsdatabase \
  -e MB_DB_PORT=5432 \
  -e MB_DB_USER=username \
  -e MB_DB_PASS=password \
  -e MB_DB_HOST=postgres-host \
  --name vsdatabase \
  vsmanuel/vsdatabase:latest
```

Accede a la aplicación en: `http://localhost:3000`

## Actualización de versiones

Para actualizar VSDatabase a una nueva versión sin perder datos:

```bash
# Detener el contenedor actual
docker stop vsdatabase

# Descargar la nueva versión
docker pull vsmanuel/vsdatabase:latest

# Eliminar el contenedor viejo (los datos persisten en la BD externa o volumen)
docker rm vsdatabase

# Ejecutar la nueva versión con la misma configuración
docker run -d -p 3000:3000 \
  -e MB_DB_TYPE=postgres \
  -e MB_DB_DBNAME=vsdatabase \
  -e MB_DB_PORT=5432 \
  -e MB_DB_USER=username \
  -e MB_DB_PASS=password \
  -e MB_DB_HOST=postgres-host \
  --name vsdatabase \
  vsmanuel/vsdatabase:latest
```

## Variables de entorno importantes

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `MB_DB_TYPE` | Tipo de base de datos (`postgres`, `mysql`, `h2`) | `h2` |
| `MB_DB_HOST` | Host de la base de datos | - |
| `MB_DB_PORT` | Puerto de la base de datos | - |
| `MB_DB_USER` | Usuario de la base de datos | - |
| `MB_DB_PASS` | Contraseña de la base de datos | - |
| `MB_DB_DBNAME` | Nombre de la base de datos | - |

## Bases de datos soportadas

VSDatabase se conecta con las siguientes bases de datos:

- PostgreSQL
- MySQL / MariaDB
- MongoDB
- Google BigQuery
- Amazon Redshift
- Snowflake
- Microsoft SQL Server
- Oracle
- SQLite
- Y muchas más...

## Desarrollo

Para compilar VSDatabase desde el código fuente:

```bash
# Clonar el repositorio
git clone https://github.com/vera-strata-development/vs-metabase.git
cd vs-metabase

# Construir la imagen Docker
docker build -t vsdatabase:local .

# Ejecutar
docker run -d -p 3000:3000 vsdatabase:local
```

## Soporte

Para reportar problemas o solicitar funcionalidades, visita:
- Sitio web: [https://www.verastrata.com](https://www.verastrata.com)
- Email: soporte@verastrata.com

---

## Licencia

Este software está basado en Metabase y mantiene la licencia AGPL v3.
Copyright original © Metabase, Inc.
Modificaciones © Vera Strata

## Código fuente

El código fuente completo está disponible en: https://github.com/vera-strata-development/vs-metabase

## Metabase original

Basado en Metabase v0.54.x - https://github.com/metabase/metabase
