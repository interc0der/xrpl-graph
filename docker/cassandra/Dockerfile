FROM ubuntu:20.04

RUN export LANGUAGE=C.UTF-8; export LANG=C.UTF-8; export LC_ALL=C.UTF-8; export DEBIAN_FRONTEND=noninteractive

COPY docker-entrypoint.sh /
COPY ./config ./cfg

RUN apt-get -y update

RUN sudo apt-get -y install git pkg-config protobuf-compiler libprotobuf-dev libssl-dev wget build-essential bison flex autoconf cmake && \
    wget -O $HOME/boost_1_75_0.tar.gz https://boostorg.jfrog.io/artifactory/main/release/1.75.0/source/boost_1_75_0.tar.gz && \
    tar xvzf $HOME/boost_1_75_0.tar.gz && \
    cd $HOME/boost_1_75_0 && \
    ./bootstrap.sh && \
    ./b2 -j$(nproc) && \
    echo "export BOOST_ROOT=$HOME/boost_1_75_0" >> $HOME/.profile && source $HOME/.profile && \
    apt-get -y update && \
    cd $HOME && \
    git clone https://github.com/XRPLF/clio.git && \
    cd $HOME/clio && \
    apt clean && \
    cmake -B build && cmake --build build --parallel $(nproc)

ENTRYPOINT ["/docker-entrypoint.sh"]

