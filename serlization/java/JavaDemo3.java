import java.io.*;

class JavaDemo3{
    public static void main(String args[]){
        System.out.println("::Session genererated::");

        //Creating a User object
        User u1 = new User();

        //Generate a serilized User object based on the args username
        u1.name = args[0].toString();
        if(u1.name.equals("b1twis3")){
            u1.role = "admin";
            Serialize(u1);
        }
        else{
            u1.role = "user";
            Serialize(u1);
        }



       }
       public static void Serialize(User u1){
         try{

            String fname = "session.txt";

            FileOutputStream file = new FileOutputStream(fname);
            ObjectOutputStream out = new ObjectOutputStream(file);

            // Serializing the User object
            out.writeObject(u1);

            out.close();
            file.close();

        }
        catch(IOException ex){
            System.out.println("Error!");
        }

    }
}
