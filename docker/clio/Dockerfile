FROM ubuntu:20.04
ARG DEBIAN_FRONTEND=noninteractive

RUN export LANGUAGE=C.UTF-8; export LANG=C.UTF-8; export LC_ALL=C.UTF-8

COPY docker-entrypoint.sh /
COPY ./config ./cfg

RUN apt-get -y update

RUN apt-get -y install git pkg-config protobuf-compiler libprotobuf-dev libssl-dev wget build-essential bison flex autoconf cmake && \
    echo "getting boost... quietly... " && \
    wget -q -O /opt/boost_1_75_0.tar.gz https://boostorg.jfrog.io/artifactory/main/release/1.75.0/source/boost_1_75_0.tar.gz && \
    echo "unzipping boost package" && \
    tar xvzf /opt/boost_1_75_0.tar.gz && \
    # echo "access rights to boost directory" && \
    # chmod +x $HOME/boost_1_75_0 && \
    echo "setting boost directory" && \
    cd /opt/boost_1_75_0 && \
    echo "access rights to scripts" && \
    chmod +x ./bootstrap.sh && \
    echo "running boostrap script" && \
    ./bootstrap.sh && \
    echo "access rights to scripts" && \
    chmod +x ./b2 && \
    echo "running b2" && \
    ./b2 -j$(nproc) && \
    echo "export BOOST_ROOT=$HOME/boost_1_75_0" >> $HOME/.profile && source $HOME/.profile && \
    apt-get -y update && \
    cd /opt && \
    echo "cloning clio" && \
    git clone https://github.com/XRPLF/clio.git && \
    cd /opt/clio && \
    apt clean && \
    echo "building clio" && \
    cmake -B build && cmake --build build --parallel $(nproc)

ENTRYPOINT ["/docker-entrypoint.sh"]

