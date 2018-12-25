class Occurence
{
	static final int MAX = 256;
	static void getOccurence(String s)
	{
		int count[] = new int[MAX];
		int len = s.length();

		for(int i = 0; i < len; i++)
			count[s.charAt(i)]++;

		for(int i = 0; i < len; i++)
		{
			if(count[s.charAt(i)] > 0)
				System.out.print(s.charAt(i) + "" + count[s.charAt(i)]);

			count[s.charAt(i)] = 0;
		}
	}
}