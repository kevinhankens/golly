FROM "httpd:2.2"

ENV HTDOCS /usr/local/apache2/htdocs/

COPY . ${HTDOCS}

# Install Node.js
RUN apt-get update && \
    apt-get install -yq curl && \
    curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
    apt-get install -yq nodejs && \
    apt-get install -yq build-essential && \
    rm -rf /var/lib/apt/lists/* && \
    apt-get clean

RUN cd ${HTDOCS} && npm install

WORKDIR ${HTDOCS}
