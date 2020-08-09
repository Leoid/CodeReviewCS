import java.io.*;

class JavaDemo2{
    public static void main(String args[]){
        System.out.println("::Java Deserialization::");

        User u1 = null;

        //Saving the data into a file
        //String fname = "test.serialized";
        String fname = "ysoserial/calc";

        try{

            FileInputStream file = new FileInputStream(fname);
            ObjectInputStream in = new ObjectInputStream(file);

            // Deserializing the User object
            u1 = (User)in.readObject();

            in.close();
            file.close();
            System.out.println("name = "+u1.name);
            System.out.println("age = "+u1.age);

        }
        catch(IOException ex){
            System.out.println("Error!");
        }
        catch(ClassNotFoundException ex){
            System.out.println("Class Error");
        }
    }
}
