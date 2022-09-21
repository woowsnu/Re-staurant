FROM openjdk:11
RUN mkdir /app
#ARG JAR_FILE = ../back/app/build/libs/*.jar
#ADD ${JAR_FILE} app.jar
ADD ./app-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "/app.jar"]
